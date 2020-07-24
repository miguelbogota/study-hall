import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private http: HttpClient
  ) { }

  getSubjects() {
    return this.http.get<Subject>('/api/subjects');
  }

  getSubject(code: string) {
    return this.http.get<Subject>(`/api/subjects/${code}`);
  }

}
