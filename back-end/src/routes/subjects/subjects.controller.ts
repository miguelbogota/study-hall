import { Controller, Get, Post, Put, Delete, Res, Body, Param, HttpStatus, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { Subject } from './models/subject.interface';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDTO } from './models/subject.dto';

@Controller('subjects')
export class SubjectsController {

  constructor(
    private subjectService: SubjectsService
  ) {}

  @Get('/')
  async getSubjects(@Res() res: Response): Promise<Response<Subject[]>> {
    const subjects = await this.subjectService.getSubjects();
    return res.status(HttpStatus.OK).json(subjects);
  }

  @Get('/:code')
  async getSubject(@Res() res: Response, @Param('code') code: string): Promise<Response<Subject[]>> {
    const subject = await this.subjectService.getSubjectByCode(code);
    if (!subject) { throw new NotFoundException('Subject does not exists!'); }
    return res.status(HttpStatus.OK).json(subject);
  }

  @Post('/')
  async createSubject(@Res() res: Response, @Body() createSubjectDTO: CreateSubjectDTO): Promise<Response<Subject>> {
    const savedSubject = await this.subjectService.createSubject(createSubjectDTO);
    if (!savedSubject) { throw new NotFoundException('Subject was not saved!'); }
    return res.status(HttpStatus.OK).json(savedSubject);
  }

  @Put('/:code')
  async updateSubject(@Res() res: Response, @Body() createSubjectDTO: CreateSubjectDTO, @Param('code') code: string): Promise<Response<Subject>> {
    const updatedSubject = await this.subjectService.updateSubject(code, createSubjectDTO);
    if (!updatedSubject) { throw new NotFoundException('Subject does not exist!'); }
    return res.status(HttpStatus.OK).json(updatedSubject);
  }

  @Delete('/:code')
  async deleteSubject(@Res() res: Response, @Param('code') code: string): Promise<Response<Subject>> {
    const deletedSubject = await this.subjectService.deleteSubject(code);
    if (!deletedSubject) { throw new NotFoundException('Subject was not deleted!'); }
    return res.status(HttpStatus.OK).json(deletedSubject);
  }

}
