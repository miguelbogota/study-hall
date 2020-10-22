import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../routes/user/models/user.interface';
import { AuthUser } from './models/auth.model';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService
  ) { }

  /**
   * Funcion devuelve una contraseña cifrada para guardar en la base de datos.
   * @param pwd Contraseña a cifrar con bcrypt.
   */
  public hashPassword(pwd: string): Observable<string> {
    return from(hash(pwd, 10));
  }

  /**
   * Funcion compara la contraseña cifrada con la que no esta cifrada para validar
   * si es la correcta.
   * @param pwd Contraseña no cifrada.
   * @param hashedPwd Contraseña cifrada.
   */
  public comparePasswords(pwd: string, hashedPwd: string): Observable<boolean> {
    return from(compare(pwd, hashedPwd));
  }

  /**
   * Funcion devuelve el token junto al usuario que inicio sesion.
   */
  public generateJWT(user: UserInterface): AuthUser {
    const payload = { username: user.username, uid: user.uid };
    return { access_token: this.jwtService.sign(payload), user };
  }

}
