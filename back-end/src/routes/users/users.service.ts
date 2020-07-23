import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.interface';
import { CreateUserDTO } from './models/user.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private userModel: Model<User>
  ) { }

  /**
   * Funcion devuelve todos los usuarios en la db.
   */
  public async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  /**
   * Funcion devuelve un usuario especifico en la db con Id.
   * @param id Id del usuario a buscar.
   */
  public async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  /**
   * Funcion devuelve un usuario especifico en la db con username.
   * @param username Nombre de usuario del usuario a buscar.
   */
  public async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ "username": username });
    return user;
  }

  /**
   * Funcion agrega un usuario a la db y devuelve ese mismo usuario con el id.
   * @param createUserDTO Usuario a crear en la db.
   */
  public async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = new this.userModel(createUserDTO);
    const savedUser = await newUser.save();
    return savedUser;
  }

  /**
   * Funcion busca a un usuario en la db y lo actualiza con la informacion
   * que se le pase de segundo parametro y devuelve el usuario actualizado.
   * @param username Nombre de usuario del usuario a actualizar.
   * @param createUserDTO Usuario actializado a remplazar informacion.
   */
  public async updateUser(username: string, createUserDTO: CreateUserDTO): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate({ "username": username }, createUserDTO, { new: true });
    return updatedUser;
  }

  /**
   * Funcion elimina un usuario de la db y devuelve al usuario eliminado.
   * @param username Nombre de usuario del usuario a eliminar.
   */
  public async deleteUser(username: string): Promise<User> {
    const deletedUser = await this.userModel.findOneAndRemove({ "username": username });
    return deletedUser;
  }

}
