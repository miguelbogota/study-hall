import { Controller, Get, Post, Put, Delete, Res, Body, Param, HttpStatus, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { Group } from './models/group.interface';
import { GroupsService } from './groups.service';
import { CreateGroupDTO } from './models/group.dto';

@Controller('groups')
export class GroupsController {

  constructor(
    private groupService: GroupsService
  ) {}

  @Get('/')
  async getGroups(@Res() res: Response): Promise<Response<Group[]>> {
    const groups = await this.groupService.getGroups();
    return res.status(HttpStatus.OK).json(groups);
  }

  @Get('/:code')
  async getGroup(@Res() res: Response, @Param('code') code: string): Promise<Response<Group[]>> {
    const group = await this.groupService.getGroupByCode(code);
    if (!group) { throw new NotFoundException('Group does not exists!'); }
    return res.status(HttpStatus.OK).json(group);
  }

  @Post('/')
  async createGroup(@Res() res: Response, @Body() createGroupDTO: CreateGroupDTO): Promise<Response<Group>> {
    const savedGroup = await this.groupService.createGroup(createGroupDTO);
    if (!savedGroup) { throw new NotFoundException('Group was not saved!'); }
    return res.status(HttpStatus.OK).json(savedGroup);
  }

  @Put('/:code')
  async updateGroup(@Res() res: Response, @Body() createGroupDTO: CreateGroupDTO, @Param('code') code: string): Promise<Response<Group>> {
    const updatedGroup = await this.groupService.updateGroup(code, createGroupDTO);
    if (!updatedGroup) { throw new NotFoundException('Group does not exist!'); }
    return res.status(HttpStatus.OK).json(updatedGroup);
  }

  @Delete('/:code')
  async deleteGroup(@Res() res: Response, @Param('code') code: string): Promise<Response<Group>> {
    const deletedGroup = await this.groupService.deleteGroup(code);
    if (!deletedGroup) { throw new NotFoundException('Group was not deleted!'); }
    return res.status(HttpStatus.OK).json(deletedGroup);
  }

}
