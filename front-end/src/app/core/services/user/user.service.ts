import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = 'https://study-hall-api.herokuapp.com/api/users';

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.API);
  }

  public getUser(uid: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.API}/${uid}`);
  }

  public addUser(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.API, user);
  }

  public updateUser(uid: string, user: UserInterface): Observable<UserInterface> {
    return this.http.put<UserInterface>(`${this.API}/${uid}`, user);
  }

  public deleteUser(uid: string): Observable<UserInterface> {
    return this.http.delete<UserInterface>(`${this.API}/${uid}`);
  }

}
