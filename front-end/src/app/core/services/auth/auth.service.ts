import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  signIn(username: string, password: string) {
    return this.http.post<any>('/api/users/signin', { username, password })
      .pipe(
        map((token) => {
          localStorage.setItem('jwt-token', token.access_token);
          return token;
        })
      );
  }

  signOut() {
    localStorage.clear();
  }

}
