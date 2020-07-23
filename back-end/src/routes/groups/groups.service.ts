import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Group, Chat } from './models/group.interface';
import { CreateGroupDTO, CreateChatDTO } from './models/group.dto';

@Injectable()
export class GroupsService {

  constructor(
    @InjectModel('Group') private groupModel: Model<Group>
  ) { }

  /**
   * Funcion devuelve todos los grupos en la db.
   */
  public async getGroups(): Promise<Group[]> {
    const groups = await this.groupModel.find();
    return groups;
  }

  /**
   * Funcion devuelve un grupo especifico en la db con Id.
   * @param id Id del grupo a buscar.
   */
  public async getGroupById(id: string): Promise<Group> {
    const subject = await this.groupModel.findById(id);
    return subject;
  }

  /**
   * Funcion devuelve un grupo especifico en la db con el codigo.
   * @param code Codigo de la materia a buscar.
   */
  public async getGroupByCode(code: string): Promise<Group> {
    const group = await this.groupModel.findOne({ "code": code });
    return group;
  }

  /**
   * Funcion agrega un grupo a la db y devuelve ese mismo grupo con el id.
   * @param createGroupDTO Grupo a crear en la db.
   */
  public async createGroup(createGroupDTO: CreateGroupDTO): Promise<Group> {
    const newGroup = new this.groupModel(createGroupDTO);
    const savedGroup = await newGroup.save();
    return savedGroup;
  }

  /**
   * Funcion busca a un grupo en la db y lo actualiza con la informacion
   * que se le pase de segundo parametro y devuelve el grupo actualizado.
   * @param code Codigo de la materia a actualizar.
   * @param createGroupDTO Grupo actializado a remplazar informacion.
   */
  public async updateGroup(code: string, createGroupDTO: CreateGroupDTO): Promise<Group> {
    const updatedGroup = await this.groupModel.findOneAndUpdate({ "code": code }, createGroupDTO, { new: true });
    return updatedGroup;
  }

  /**
   * Funcion elimina un grupo de la db y devuelve el grupo eliminada.
   * @param code Codigo del grupo a eliminar.
   */
  public async deleteGroup(code: string): Promise<Group> {
    const deletedGroup = await this.groupModel.findOneAndRemove({ "code": code });
    return deletedGroup;
  }


}
