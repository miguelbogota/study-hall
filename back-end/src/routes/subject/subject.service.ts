import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SubjectInterface } from './models/subject.interface';
import { Subject } from './models/subject.schema';

@Injectable()
export class SubjectService {

  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<SubjectInterface>
  ) { }

  /**
   * Funcion devuelve todas las materias en la db.
   */
  public getSubjects(): Observable<SubjectInterface[] | unknown> {
    return from(this.subjectModel.find())
      .pipe(
        map((us: SubjectInterface[]) => {
          return us.map((u) => ({
            id: u.id,
            code: u.code,
            name: u.name,
            description: u.description
          } as SubjectInterface));
        }),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion devuelve una materia especifica en la db con Id.
   * @param id Id de la materia a buscar.
   */
  public getSubjectById(id: string): Observable<SubjectInterface | unknown> {
    return from(this.subjectModel.findById(id))
      .pipe(
        map((u: SubjectInterface) => ({
          id: u.id,
          code: u.code,
          name: u.name,
          description: u.description
        } as SubjectInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion devuelve una materia especifica en la db con code.
   * @param code Codigo de la materia a buscar.
   */
  public getSubjectByCode(code: string): Observable<SubjectInterface | unknown> {
    return from(this.subjectModel.findOne({ code: code }))
      .pipe(
        map((u: SubjectInterface) => ({
          id: u.id,
          code: u.code,
          name: u.name,
          description: u.description
        } as SubjectInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion agrega una materia a la db y devuelve esa misma materia con el id.
   * @param subject Materia a crear en la db.
   */
  public createSubject(subject: SubjectInterface): Observable<SubjectInterface | unknown> {
    const newSubject = new this.subjectModel(subject);
    return from(newSubject.save()).pipe(
      map((u: SubjectInterface) => ({
        id: u.id,
        code: u.code,
        name: u.name,
        description: u.description
      } as SubjectInterface)),
      catchError(err => of({ error: err.message }))
    );
  }

  /**
   * Funcion busca a una materia en la db y la actualiza con la informacion
   * que se le pase de segundo parametro y devuelve la materia actualizada.
   * @param code Codigo de la materia a actualizar.
   * @param subject Materia actualizada a remplazar la informacion.
   */
  public updateSubject(code: string, subject: SubjectInterface): Observable<SubjectInterface | unknown> {
    return from(this.subjectModel.findOneAndUpdate({ code: code }, subject, { new: true }))
      .pipe(
        map((u: SubjectInterface) => ({
          id: u.id,
          code: u.code,
          name: u.name,
          description: u.description
        } as SubjectInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion elimina una materia de la db y devuelve a la materia eliminada.
   * @param code Codigo de la materia a eliminar.
   */
  public deleteSubject(code: string): Observable<SubjectInterface | unknown> {
    return from(this.subjectModel.findOneAndRemove({ code: code }))
      .pipe(
        map((u: SubjectInterface) => ({
          id: u.id,
          code: u.code,
          name: u.name,
          description: u.description
        } as SubjectInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

}
