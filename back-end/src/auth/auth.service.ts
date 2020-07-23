import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { User } from 'src/routes/users/models/user.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService
  ) { }

  public generateJWT(payload: User): Observable<string> {
    return from(this.jwtService.signAsync({ user: payload }));
  }

  public hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  public comparePassword(newPassword: string, hashPassword: string): Observable<any> {
    return of<any | boolean>(bcrypt.compare(newPassword, hashPassword));
  }

}
