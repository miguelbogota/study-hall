import { Controller, Get, Post, Put, Delete, Res, Body, Param, HttpStatus, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { User } from './models/user.interface';
import { UsersService } from './users.service';
import { CreateUserDTO } from './models/user.dto';

@Controller('users')
export class UsersController {

  constructor(
    private userService: UsersService
  ) {}

  @Get('/')
  async getUsers(@Res() res: Response): Promise<Response<User[]>> {
    const users = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('/:username')
  async getUser(@Res() res: Response, @Param('username') username: string): Promise<Response<User[]>> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) { throw new NotFoundException('User does not exists!'); }
    return res.status(HttpStatus.OK).json(user);
  }

  @Post('/')
  async createUser(@Res() res: Response, @Body() createUserDTO: CreateUserDTO): Promise<Response<User>> {
    const savedUser = await this.userService.createUser(createUserDTO);
    if (!savedUser) { throw new NotFoundException('User was not saved!'); }
    return res.status(HttpStatus.OK).json(savedUser);
  }

  @Put('/:username')
  async updateUser(@Res() res: Response, @Body() createUserDTO: CreateUserDTO, @Param('username') username: string): Promise<Response<User>> {
    const updatedUser = await this.userService.updateUser(username, createUserDTO);
    if (!updatedUser) { throw new NotFoundException('User does not exist!'); }
    return res.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete('/:username')
  async deleteUser(@Res() res: Response, @Param('username') username: string): Promise<Response<User>> {
    const deletedUser = await this.userService.deleteUser(username);
    if (!deletedUser) { throw new NotFoundException('User was not deleted!'); }
    return res.status(HttpStatus.OK).json(deletedUser);
  }

}
