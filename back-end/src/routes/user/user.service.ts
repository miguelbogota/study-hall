import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.schema';
import { Observable, from, throwError, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserInterface } from './models/user.interface';
import { AuthService } from 'src/auth/auth.service';
import { AuthUser } from 'src/auth/models/auth.model';

@Injectable()
export class UserService {


  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private authService: AuthService
  ) { }

  /**
   * Funcion devuelve todos los usuarios en la db.
   */
  public getUsers(): Observable<UserInterface[]> {
    return from(this.userModel.find())
      .pipe(
        map((users: User[]) => {
          return users.map((u) => ({
            uid: u.id,
            username: u.username,
            photoUrl: u.photoUrl,
            status: u.status,
            email: u.email,
            subjectIds: u.subjectIds,
            type: u.type
          } as UserInterface));
        })
      );
  }

  /**
   * Funcion devuelve un usuario especifico en la db con Id.
   * @param id Id del usuario a buscar.
   */
  public getUserById(id: string): Observable<UserInterface> {
    return from(this.userModel.findById(id))
      .pipe(
        map((user: User) => ({
          uid: user.id,
          username: user.username,
          photoUrl: user.photoUrl,
          status: user.status,
          email: user.email,
          subjectIds: user.subjectIds,
          type: user.type
        } as UserInterface))
      );
  }

  /**
   * Funcion devuelve un usuario especifico en la db con username.
   * @param username Nombre de usuario del usuario a buscar.
   */
  public getUserByUsername(username: string): Observable<UserInterface> {
    return from(this.userModel.findOne({ username: username }))
      .pipe(
        map((user: User) => ({
          uid: user.id,
          username: user.username,
          password: user.password,
          photoUrl: user.photoUrl,
          status: user.status,
          email: user.email,
          subjectIds: user.subjectIds,
          type: user.type
        } as UserInterface))
      );
  }

  /**
   * Funcion agrega un usuario a la db y devuelve ese mismo usuario con el id.
   * @param createUserDTO Usuario a crear en la db.
   */
  public createUser(user: UserInterface): Observable<UserInterface> {
    return this.authService.hashPassword(user.password)
      .pipe(
        switchMap((pwdHash: string) => {
          const newUser = new this.userModel(user);
          newUser.password = pwdHash;
          return from(newUser.save()).pipe(
            map((user: User) => ({
              uid: user.id,
              username: user.username,
              photoUrl: user.photoUrl,
              status: user.status,
              email: user.email,
              subjectIds: user.subjectIds,
              type: user.type
            } as UserInterface)),
            catchError(err => throwError(err))
          );
        })
      );
  }

  public signIn(user: { username: string; password: string; }): Observable<AuthUser> {
    return this.validateUser(user.username, user.password)
      .pipe(
        switchMap((u: UserInterface) => (u ? of(this.authService.generateJWT(u)) : of(null))),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion compara el usuario con el de la base de datos y devuelve el
   * usuario si las credenciales son correctas.
   * @param username Nombre de usuario a comparar.
   * @param password Contraseña a comparar
   */
  private validateUser(username: string, password: string): Observable<UserInterface> {
    return this.getUserByUsername(username)
      .pipe(
        switchMap((user: User) => this.authService.comparePasswords(password, user.password)
          .pipe(
            map((match: boolean) => {
              if (match) {
                return ({
                  uid: user.id,
                  username: user.username,
                  photoUrl: user.photoUrl,
                  status: user.status,
                  email: user.email,
                  subjectIds: user.subjectIds,
                  type: user.type
                } as UserInterface);
              }
              else { throw Error; }
            }),
            catchError(err => throwError(err))
          ))
      );
  }

}
