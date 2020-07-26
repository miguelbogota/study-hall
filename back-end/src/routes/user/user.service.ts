import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from, throwError, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserInterface } from './models/user.interface';
import { AuthService } from 'src/auth/auth.service';
import { AuthUser } from 'src/auth/models/auth.model';
import { User } from './models/user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserInterface>,
    private authService: AuthService
  ) { }

  /**
   * Funcion devuelve todos los usuarios en la db.
   */
  public getUsers(): Observable<UserInterface[] | unknown> {
    return from(this.userModel.find())
      .pipe(
        map((us: UserInterface[]) => {
          return us.map((u) => ({
            uid: u.id,
            username: u.username,
            password: u.password,
            photoUrl: u.photoUrl,
            status: u.status,
            email: u.email,
            subjectIds: u.subjectIds,
            type: u.type
          } as UserInterface));
        }),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion devuelve un usuario especifico en la db con Id.
   * @param id Id del usuario a buscar.
   */
  public getUserById(id: string): Observable<UserInterface | unknown> {
    return from(this.userModel.findById(id))
      .pipe(
        map((u: UserInterface) => ({
          uid: u.id,
          username: u.username,
          password: u.password,
          photoUrl: u.photoUrl,
          status: u.status,
          email: u.email,
          subjectIds: u.subjectIds,
          type: u.type
        } as UserInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion devuelve un usuario especifico en la db con username.
   * @param username Nombre de usuario del usuario a buscar.
   */
  public getUserByUsername(username: string): Observable<UserInterface | unknown> {
    return from(this.userModel.findOne({ username: username }))
      .pipe(
        map((u: UserInterface) => ({
          uid: u.id,
          username: u.username,
          password: u.password,
          photoUrl: u.photoUrl,
          status: u.status,
          email: u.email,
          subjectIds: u.subjectIds,
          type: u.type
        } as UserInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion agrega un usuario a la db y devuelve ese mismo usuario con el id.
   * @param user Usuario a crear en la db.
   */
  public createUser(user: UserInterface): Observable<UserInterface | unknown> {
    return this.authService.hashPassword(user.password)
      .pipe(
        switchMap((pwdHash: string) => {
          const newUser = new this.userModel(user);
          newUser.password = pwdHash;
          return from(newUser.save()).pipe(
            map((u: UserInterface) => ({
              uid: u.id,
              username: u.username,
              photoUrl: u.photoUrl,
              status: u.status,
              email: u.email,
              subjectIds: u.subjectIds,
              type: u.type
            } as UserInterface)),
            catchError(err => of({ error: err.message }))
          );
        })
      );
  }

  /**
   * Funcion busca a un usuario en la db y lo actualiza con la informacion
   * que se le pase de segundo parametro y devuelve el usuario actualizado.
   * @param username Nombre de usuario del usuario a actualizar.
   * @param user Usuario actializado a remplazar informacion.
   */
  public updateUser(username: string, user: UserInterface): Observable<UserInterface | unknown> {
    return from(this.userModel.findOneAndUpdate({ username: username }, user, { new: true }))
      .pipe(
        map((u: UserInterface) => ({
          uid: u.id,
          username: u.username,
          photoUrl: u.photoUrl,
          status: u.status,
          email: u.email,
          subjectIds: u.subjectIds,
          type: u.type
        } as UserInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion elimina un usuario de la db y devuelve al usuario eliminado.
   * @param username Nombre de usuario del usuario a eliminar.
   */
  public deleteUser(username: string): Observable<UserInterface | unknown> {
    return from(this.userModel.findOneAndRemove({ username: username }))
      .pipe(
        map((u: UserInterface) => ({
          uid: u.id,
          username: u.username,
          photoUrl: u.photoUrl,
          status: u.status,
          email: u.email,
          subjectIds: u.subjectIds,
          type: u.type
        } as UserInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion valida la inicia de sesion de un usuario.
   * @param user Credeciales con las cuales se iniciara sesion.
   */
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
  private validateUser(username: string, password: string): Observable<UserInterface | unknown> {
    return this.getUserByUsername(username)
      .pipe(
        switchMap((user: UserInterface) => this.authService.comparePasswords(password, user.password)
          .pipe(
            map((match: boolean) => {
              if (match) {
                return ({
                  uid: user.id,
                  username: user.username,
                  password: user.password,
                  photoUrl: user.photoUrl,
                  status: user.status,
                  email: user.email,
                  subjectIds: user.subjectIds,
                  type: user.type
                } as UserInterface);
              }
              else { throw Error; }
            }),
            catchError(err => of({ error: err.message }))
          ))
      );
  }

}
