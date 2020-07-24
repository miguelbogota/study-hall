import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { User } from './models/user.interface';
import { UsersService } from './users.service';
import { CreateUserDTO } from './models/user.dto';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Controller('users')
export class UsersController {

  constructor(
    private userService: UsersService
  ) { }

  @Post('/signin')
  signIn(@Body() user: User): Observable<any> {
    return this.userService.signIn(user)
      .pipe(
        map((jwt: string) => ({ access_token: jwt })),
        catchError(err => of({ error: err.message }))
      );
  }

  @Get('/')
  getUsers(): Observable<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:username')
  getUser(@Param('username') username: string): Observable<User | unknown> {
    return this.userService.getUserByUsername(username)
      .pipe(
        map((user: User) => user),
        catchError(err => of({ error: err.message }))
      );
  }

  @Post('/')
  createUser(@Body() createUserDTO: CreateUserDTO): Observable<User | unknown> {
    return this.userService.createUser(createUserDTO)
      .pipe(
        map((user: User) => user),
        catchError(err => of({ error: err.message }))
      );
  }

  @Put('/:username')
  updateUser(@Body() createUserDTO: CreateUserDTO, @Param('username') username: string): Observable<User | unknown> {
    return this.userService.updateUser(username, createUserDTO)
      .pipe(
        map((user: User) => user),
        catchError(err => of({ error: err.message }))
      );
  }

  @Delete('/:username')
  deleteUser(@Param('username') username: string): Observable<User | unknown> {
    return this.userService.deleteUser(username)
      .pipe(
        map((user: User) => user),
        catchError(err => of({ error: err.message }))
      );
  }

}
