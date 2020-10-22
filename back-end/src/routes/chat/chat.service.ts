import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ChatInterface } from './models/chat.interface';
import { Chat } from './models/chat.schema';

@Injectable()
export class ChatService {

  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatInterface>
  ) { }

  /**
   * Funcion devuelve todos los chats en la db.
   */
  public getChats(): Observable<ChatInterface[] | unknown> {
    return from(this.chatModel.find())
      .pipe(
        map((us: ChatInterface[]) => {
          return us.map((u) => ({
            id: u.id,
            text: u.text,
            createAt: u.createAt,
            uid: u.uid,
            groupId: u.groupId
          } as ChatInterface));
        }),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion devuelve un chat especifico en la db con Id.
   * @param id Id del chat a buscar.
   */
  public getChatById(id: string): Observable<ChatInterface | unknown> {
    return from(this.chatModel.findById(id))
      .pipe(
        map((u: ChatInterface) => ({
          id: u.id,
          text: u.text,
          createAt: u.createAt,
          uid: u.uid,
          groupId: u.groupId
        } as ChatInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion agrega un chat a la db y devuelve ese mismo chat con el id.
   * @param chat Chat a crear en la db.
   */
  public createChat(chat: ChatInterface): Observable<ChatInterface | unknown> {
    const newChat = new this.chatModel(chat);
    return from(newChat.save()).pipe(
      map((u: ChatInterface) => ({
        id: u.id,
        text: u.text,
        createAt: u.createAt,
        uid: u.uid,
        groupId: u.groupId
      } as ChatInterface)),
      catchError(err => of({ error: err.message }))
    );
  }

  /**
   * Funcion busca a un chat en la db y lo actualiza con la informacion
   * que se le pase de segundo parametro y devuelve el chat actualizada.
   * @param chatId Id del chat a actualizar.
   * @param chat Chat actualizado a remplazar la informacion.
   */
  public updateChat(chatId: string, chat: ChatInterface): Observable<ChatInterface | unknown> {
    return from(this.chatModel.findByIdAndUpdate(chatId, chat, { new: true }))
      .pipe(
        map((u: ChatInterface) => ({
          id: u.id,
          text: u.text,
          createAt: u.createAt,
          uid: u.uid,
          groupId: u.groupId
        } as ChatInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

  /**
   * Funcion elimina un chat de la db y devuelve a el chat eliminada.
   * @param chatId Id del chat a eliminar.
   */
  public deleteChat(chatId: string): Observable<ChatInterface | unknown> {
    return from(this.chatModel.findByIdAndDelete(chatId))
      .pipe(
        map((u: ChatInterface) => ({
          id: u.id,
          text: u.text,
          createAt: u.createAt,
          uid: u.uid,
          groupId: u.groupId
        } as ChatInterface)),
        catchError(err => of({ error: err.message }))
      );
  }

}
