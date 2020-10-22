import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupInterface } from '../../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private API = 'https://study-hall-api.herokuapp.com/api/groups';

  constructor(
    private http: HttpClient
  ) { }

  public getGroups(): Observable<GroupInterface[]> {
    return this.http.get<GroupInterface[]>(this.API);
  }

  public getGroup(code: string): Observable<GroupInterface> {
    return this.http.get<GroupInterface>(`${this.API}/${code}`);
  }

  public addGroup(group: GroupInterface): Observable<GroupInterface> {
    return this.http.post<GroupInterface>(this.API, group);
  }

  public updateGroup(code: string, group: GroupInterface): Observable<GroupInterface> {
    return this.http.put<GroupInterface>(`${this.API}/${code}`, group);
  }

  public deleteGroup(code: string): Observable<GroupInterface> {
    return this.http.delete<GroupInterface>(`${this.API}/${code}`);
  }

}
