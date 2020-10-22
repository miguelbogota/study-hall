import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SubjectInterface } from './models/subject.interface';
import { SubjectService } from './subject.service';
import { Observable } from 'rxjs';

@Controller('subjects')
export class SubjectController {

  constructor(
    private subjectService: SubjectService
  ) { }

  @Get('/')
  getSubjects(): Observable<SubjectInterface[] | unknown> {
    return this.subjectService.getSubjects();
  }

  @Get('/:subjectId')
  getSubjectById(@Param('subjectId') subjectId: string): Observable<SubjectInterface | unknown> {
    return this.subjectService.getSubjectById(subjectId);
  }

  @Get('/:code')
  getSubject(@Param('code') code: string): Observable<SubjectInterface | unknown> {
    return this.subjectService.getSubjectByCode(code);
  }

  @Post('/')
  createSubject(@Body() subject: SubjectInterface): Observable<SubjectInterface | unknown> {
    return this.subjectService.createSubject(subject);
  }

  @Put('/:code')
  updateSubject(@Param('code') code: string, @Body() subject: SubjectInterface): Observable<SubjectInterface | unknown> {
    return this.subjectService.updateSubject(code, subject);
  }

  @Delete('/:code')
  deleteSubject(@Param('code') code: string): Observable<SubjectInterface | unknown> {
    return this.subjectService.deleteSubject(code);
  }

}
