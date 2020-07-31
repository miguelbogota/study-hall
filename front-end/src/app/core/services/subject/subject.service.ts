import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubjectInterface } from '../../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private API = 'https://study-hall-api.herokuapp.com/api/subjects';

  constructor(
    private http: HttpClient
  ) { }

  public getSubjects(): Observable<SubjectInterface[]> {
    return this.http.get<SubjectInterface[]>(this.API);
  }

  public getSubject(code: string): Observable<SubjectInterface> {
    return this.http.get<SubjectInterface>(`${this.API}/${code}`);
  }

  public addSubject(subject: SubjectInterface): Observable<SubjectInterface> {
    return this.http.post<SubjectInterface>(this.API, subject);
  }

  public updateSubject(code: string, subject: SubjectInterface): Observable<SubjectInterface> {
    return this.http.put<SubjectInterface>(`${this.API}/${code}`, subject);
  }

  public deleteSubject(code: string): Observable<SubjectInterface> {
    return this.http.delete<SubjectInterface>(`${this.API}/${code}`);
  }

}
