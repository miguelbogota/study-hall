import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserInterface } from './models/user.interface';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
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

  @Get('/')
  getUsers(): Observable<UserInterface[] | unknown> {
    return this.userService.getUsers();
  }

  @Get('/:uid')
  getUserById(@Param('uid') uid: string): Observable<UserInterface | unknown> {
    return this.userService.getUserById(uid);
  }

  @Get('/:username')
  getUser(@Param('username') username: string): Observable<UserInterface | unknown> {
    return this.userService.getUserByUsername(username);
  }

  @Post('/')
  createUser(@Body() user: UserInterface): Observable<UserInterface | unknown> {
    return this.userService.createUser(user);
  }

  @Put('/:username')
  updateUser(@Param('username') username: string, @Body() user: UserInterface): Observable<UserInterface | unknown> {
    return this.userService.updateUser(username, user);
  }

  @Delete('/:username')
  deleteUser(@Param('username') username: string): Observable<UserInterface | unknown> {
    return this.userService.deleteUser(username);
  }

}
