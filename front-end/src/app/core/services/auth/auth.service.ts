import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { StorageLS, StorageSLConfig } from '../../classes/storage/storagels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public authState: any;
  public authStateChanges: Observable<any>;

  private s: StorageSLConfig = { key: 'jwt-token', type: 'local' };
  private storage = new StorageLS(this.s);

  constructor(
    private http: HttpClient
  ) {
    this.authStateChanges = this.storage.watch;
    this.authState = this.storage.get<any>();
  }

  signIn(username: string, password: string) {
    return this.http.post<any>('/api/users/signin', { username, password })
      .pipe(
        map((token) => {
          this.storage.set({ token, username });
          this.authState = this.storage.get<any>();
          return token;
        })
      );
  }

  signUp(user: User) {
    return this.http.post<User>('/api/users', user);
  }

  signOut() {
    this.storage.delete();
    this.authState = this.storage.get<any>();
  }

}
