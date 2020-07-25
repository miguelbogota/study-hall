import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserInterface } from './models/user.interface';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthUser } from 'src/auth/models/auth.model';

@Controller('users')
export class UserController {

  constructor(
    private userService: UserService
  ) { }

  @Post('/signin')
  signIn(@Body() user: { username: string; password: string; }): Observable<AuthUser> {
    return this.userService.signIn(user);
  }

  @Post('/')
  createUser(@Body() user: UserInterface): Observable<UserInterface | unknown> {
    return this.userService.createUser(user)
      .pipe(
        map((user: UserInterface) => user),
        catchError(err => of({ error: err.message }))
      );
  }

}
