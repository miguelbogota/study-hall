import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GroupInterface } from './models/group.interface';
import { GroupService } from './group.service';
import { Observable } from 'rxjs';

@Controller('groups')
export class GroupController {

  constructor(
    private groupService: GroupService
  ) { }

  @Get('/')
  getGroups(): Observable<GroupInterface[] | unknown> {
    return this.groupService.getGroups();
  }

  @Get('/id/:groupId')
  getGroupById(@Param('groupId') groupId: string): Observable<GroupInterface | unknown> {
    return this.groupService.getGroupById(groupId);
  }

  @Get('/:code')
  getGroup(@Param('code') code: string): Observable<GroupInterface | unknown> {
    return this.groupService.getGroupByCode(code);
  }

  @Post('/')
  createGroup(@Body() group: GroupInterface): Observable<GroupInterface | unknown> {
    return this.groupService.createGroup(group);
  }

  @Put('/:code')
  updateGroup(@Param('code') code: string, @Body() group: GroupInterface): Observable<GroupInterface | unknown> {
    return this.groupService.updateGroup(code, group);
  }

  @Delete('/:code')
  deleteGroup(@Param('code') code: string): Observable<GroupInterface | unknown> {
    return this.groupService.deleteGroup(code);
  }

}
