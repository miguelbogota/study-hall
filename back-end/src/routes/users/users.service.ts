import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.interface';
import { CreateUserDTO } from './models/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Observable, from, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private authService: AuthService
  ) { }

  /**
   * Funcion devuelve todos los usuarios en la db.
   */
  public getUsers(): Observable<User[]> {
    return from(this.userModel.find())
      .pipe(
        map((users: User[]) => {
          const newUsers = users.map((u) => {
            const sendUser = {
              _id: u._id,
              username: u.username,
              photoUrl: u.photoUrl,
              status: u.status,
              email: u.email,
              subjectIds: u.subjectIds,
              type: u.type
            }
            return sendUser as User;
          })
          return newUsers;
        })
      );
  }

  /**
   * Funcion devuelve un usuario especifico en la db con Id.
   * @param id Id del usuario a buscar.
   */
  public getUserById(id: string): Observable<User> {
    return from(this.userModel.findById(id))
      .pipe(
        map((user: User) => {
          const sendUser = {
            _id: user._id,
            username: user.username,
            photoUrl: user.photoUrl,
            status: user.status,
            email: user.email,
            subjectIds: user.subjectIds,
            type: user.type
          }
          return sendUser as User;
        })
      );
  }

  /**
   * Funcion devuelve un usuario especifico en la db con username.
   * @param username Nombre de usuario del usuario a buscar.
   */
  public getUserByUsername(username: string): Observable<User> {
    return from(this.userModel.findOne({ "username": username }))
      .pipe(
        map((user: User) => {
          const sendUser = {
            _id: user._id,
            username: user.username,
            photoUrl: user.photoUrl,
            status: user.status,
            email: user.email,
            subjectIds: user.subjectIds,
            type: user.type
          }
          return sendUser as User;
        })
      );
  }

  /**
   * Funcion agrega un usuario a la db y devuelve ese mismo usuario con el id.
   * @param createUserDTO Usuario a crear en la db.
   */
  public createUser(createUserDTO: CreateUserDTO): Observable<User> {
    return this.authService.hashPassword(createUserDTO.password)
      .pipe(
        switchMap((pwdHash: string) => {
          const newUser = new this.userModel(createUserDTO);
          newUser.password = pwdHash;
          return from(newUser.save()).pipe(
            map((user: User) => {
              const sendUser = {
                _id: user._id,
                username: user.username,
                photoUrl: user.photoUrl,
                status: user.status,
                email: user.email,
                subjectIds: user.subjectIds,
                type: user.type
              }
              return sendUser as User;
            }),
            catchError(err => throwError(err))
          );
        })
      );
  }

  /**
   * Funcion busca a un usuario en la db y lo actualiza con la informacion
   * que se le pase de segundo parametro y devuelve el usuario actualizado.
   * @param username Nombre de usuario del usuario a actualizar.
   * @param createUserDTO Usuario actializado a remplazar informacion.
   */
  public updateUser(username: string, createUserDTO: CreateUserDTO): Observable<User> {
    delete createUserDTO.email;
    delete createUserDTO.username;
    delete createUserDTO.password;
    return from(this.userModel.findOneAndUpdate({ "username": username }, createUserDTO, { new: true }));
  }

  /**
   * Funcion elimina un usuario de la db y devuelve al usuario eliminado.
   * @param username Nombre de usuario del usuario a eliminar.
   */
  public deleteUser(username: string): Observable<User> {
    return from(this.userModel.findOneAndRemove({ "username": username }));
  }

  public signIn(user: User): Observable<string> {
    return this.validateUser(user.username, user.password)
      .pipe(
        switchMap((user: User) => {
          if (user) {
            return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
          }
          else {
            return 'Wrong credentials';
          }
        })
      );
  }

  /**
   * Funcion compara el usuario con el de la base de datos y devuelve el
   * usuario si las credenciales son correctas.
   * @param username Nombre de usuario a comparar.
   * @param password Contraseña a comparar
   */
  private validateUser(username: string, password: string): Observable<User> {
    return this.getUserByUsername(username)
      .pipe(
        switchMap((user: User) => this.authService.comparePassword(password, user.password)
          .pipe(
            map((match: boolean) => {
              if (match) {
                const sendUser = {
                  _id: user._id,
                  username: user.username,
                  photoUrl: user.photoUrl,
                  status: user.status,
                  email: user.email,
                  subjectIds: user.subjectIds,
                  type: user.type
                }
                return sendUser as User;
              }
              else { throw Error; }
            })
          ))
      );
  }

}
