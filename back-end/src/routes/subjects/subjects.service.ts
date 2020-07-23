import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from './models/subject.interface';
import { CreateSubjectDTO } from './models/subject.dto';


@Injectable()
export class SubjectsService {

  constructor(
    @InjectModel('Subject') private subjectModel: Model<Subject>
  ) { }

  /**
   * Funcion devuelve todas las materias en la db.
   */
  public async getSubjects(): Promise<Subject[]> {
    const subjects = await this.subjectModel.find();
    return subjects;
  }

  /**
   * Funcion devuelve una materia especifica en la db con Id.
   * @param id Id del materia a buscar.
   */
  public async getSubjectById(id: string): Promise<Subject> {
    const subject = await this.subjectModel.findById(id);
    return subject;
  }

  /**
   * Funcion devuelve una materia especifica en la db con el codigo.
   * @param code Codigo de la materia a buscar.
   */
  public async getSubjectByCode(code: string): Promise<Subject> {
    const subject = await this.subjectModel.findOne({ "code": code });
    return subject;
  }

  /**
   * Funcion agrega una materia a la db y devuelve esa misma materia con el id.
   * @param createsubjectDTO Materia a crear en la db.
   */
  public async createSubject(createsubjectDTO: CreateSubjectDTO): Promise<Subject> {
    const newSubject = new this.subjectModel(createsubjectDTO);
    const savedSubject = await newSubject.save();
    return savedSubject;
  }

  /**
   * Funcion busca a una materia en la db y la actualiza con la informacion
   * que se le pase de segundo parametro y devuelve la materia actualizado.
   * @param code Codigo de la materia a actualizar.
   * @param createSubjectDTO Materia actializada a remplazar informacion.
   */
  public async updateSubject(code: string, createSubjectDTO: CreateSubjectDTO): Promise<Subject> {
    const updatedSubject = await this.subjectModel.findOneAndUpdate({ "code": code }, createSubjectDTO, { new: true });
    return updatedSubject;
  }

  /**
   * Funcion elimina una materia de la db y devuelve al materia eliminada.
   * @param code Codigo de la materia a eliminar.
   */
  public async deleteSubject(code: string): Promise<Subject> {
    const deletedSubject = await this.subjectModel.findOneAndRemove({ "code": code });
    return deletedSubject;
  }

}
