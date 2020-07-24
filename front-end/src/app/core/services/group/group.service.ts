import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group, Chat } from '../../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient
  ) { }

  getGroup(code: string) {
    return this.http.get<Group>(`/api/groups/${code}`);
  }

  setGroup(group: Group) {
    return this.http.post<Group>(`/api/groups`, group);
  }

  updateGroup(code: string, group: Group) {
    return this.http.put<Group>(`/api/groups/${code}`, group);
  }

  sendChat(code: string, chat: Chat) {
    return this.http.put<Group>(`/api/groups/chat/${code}`, chat);
  }

}
