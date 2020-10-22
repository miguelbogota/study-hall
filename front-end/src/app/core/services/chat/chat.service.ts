import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatInterface } from '../../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private API = 'https://study-hall-api.herokuapp.com/api/chats';

  constructor(
    private http: HttpClient
  ) { }

  public getChats(): Observable<ChatInterface[]> {
    return this.http.get<ChatInterface[]>(this.API);
  }

  public getChatsFromGroup(groupId: string): Observable<ChatInterface> {
    return this.http.get<ChatInterface>(`${this.API}/${groupId}`);
  }

  public addChat(chat: ChatInterface): Observable<ChatInterface> {
    return this.http.post<ChatInterface>(this.API, chat);
  }

  public updateChat(chatId: string, chat: ChatInterface): Observable<ChatInterface> {
    return this.http.put<ChatInterface>(`${this.API}/${chatId}`, chat);
  }

  public deleteChat(chatId: string): Observable<ChatInterface> {
    return this.http.delete<ChatInterface>(`${this.API}/${chatId}`);
  }

}
