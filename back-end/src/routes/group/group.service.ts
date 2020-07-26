import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GroupInterface } from './models/group.interface';
import { Group } from './models/group.schema';

@Injectable()
export class GroupService {

  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupInterface>
  ) { }

  /**
   * Funcion devuelve todos los grupos en la db.
   */
  public getGroups(): Observable<GroupInterface[] | unknown> {
    return from(this.groupModel.find())
      .pipe(
        map((us: GroupInterface[]) => {
          return us.map((u) => ({
            id: u.id,
            code: u.code,
            videoUrl: u.videoUrl,
            topic: u.topic,
            schedule: u.schedule,
            subjectId: u.subjectId,
            teacherId: u.teacherId,
            studentIds: u.studentIds,
            class: u.class
          } as GroupInterface));
        }),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion devuelve un grupo especifico en la db con Id.
   * @param id Id del grupo a buscar.
   */
  public getGroupById(id: string): Observable<GroupInterface | unknown> {
    return from(this.groupModel.findById(id))
      .pipe(
        map((u: GroupInterface) => ({
          id: u.id,
          code: u.code,
          videoUrl: u.videoUrl,
          topic: u.topic,
          schedule: u.schedule,
          subjectId: u.subjectId,
          teacherId: u.teacherId,
          studentIds: u.studentIds,
          class: u.class
        } as GroupInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion devuelve un grupo especifico en la db con code.
   * @param code Codigo del grupo a buscar.
   */
  public getGroupByCode(code: string): Observable<GroupInterface | unknown> {
    return from(this.groupModel.findOne({ code: code }))
      .pipe(
        map((u: GroupInterface) => ({
          id: u.id,
          code: u.code,
          videoUrl: u.videoUrl,
          topic: u.topic,
          schedule: u.schedule,
          subjectId: u.subjectId,
          teacherId: u.teacherId,
          studentIds: u.studentIds,
          class: u.class
        } as GroupInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion agrega un grupo a la db y devuelve ese mismo grupo con el id.
   * @param group Grupo a crear en la db.
   */
  public createGroup(group: GroupInterface): Observable<GroupInterface | unknown> {
    const newGroup = new this.groupModel(group);
    return from(newGroup.save()).pipe(
      map((u: GroupInterface) => ({
        id: u.id,
        code: u.code,
        videoUrl: u.videoUrl,
        topic: u.topic,
        schedule: u.schedule,
        subjectId: u.subjectId,
        teacherId: u.teacherId,
        studentIds: u.studentIds,
        class: u.class
      } as GroupInterface)),
      catchError(err => of({ error: err.message }))
    );
  }

  /**
   * Funcion busca a un grupo en la db y lo actualiza con la informacion
   * que se le pase de segundo parametro y devuelve el grupo actualizada.
   * @param code Codigo del grupo a actualizar.
   * @param group Grupo actualizado a remplazar la informacion.
   */
  public updateGroup(code: string, group: GroupInterface): Observable<GroupInterface | unknown> {
    return from(this.groupModel.findOneAndUpdate({ code: code }, group, { new: true }))
      .pipe(
        map((u: GroupInterface) => ({
          id: u.id,
          code: u.code,
          videoUrl: u.videoUrl,
          topic: u.topic,
          schedule: u.schedule,
          subjectId: u.subjectId,
          teacherId: u.teacherId,
          studentIds: u.studentIds,
          class: u.class
        } as GroupInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion elimina un grupo de la db y devuelve a el grupo eliminada.
   * @param code Codigo del grupo a eliminar.
   */
  public deleteGroup(code: string): Observable<GroupInterface | unknown> {
    return from(this.groupModel.findOneAndRemove({ code: code }))
      .pipe(
        map((u: GroupInterface) => ({
          id: u.id,
          code: u.code,
          videoUrl: u.videoUrl,
          topic: u.topic,
          schedule: u.schedule,
          subjectId: u.subjectId,
          teacherId: u.teacherId,
          studentIds: u.studentIds,
          class: u.class
        } as GroupInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

}
