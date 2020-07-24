import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public async getUsers() {
    return this.http.get<User[]>('/api/users');
  }

  public getUser(userId: string) {
    return this.http.get<User>(`/api/users/${userId}`);
  }

}
