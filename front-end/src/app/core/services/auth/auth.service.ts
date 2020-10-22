import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageSLConfig, StorageLS } from '../../classes/storage/storagels.class';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthInterface } from '../../models/auth.model';
import { UserInterface } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState: AuthInterface;
  public authStateChanges: Observable<AuthInterface>;

  private API = 'https://study-hall-api.herokuapp.com/api/users';
  private s: StorageSLConfig = { key: 'jwt-token', type: 'local' };
  private storage = new StorageLS(this.s);

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.authStateChanges = this.storage.watch;
    this.authState = this.storage.get<AuthInterface>();
  }

  signIn(username: string, password: string) {
    return this.http.post<AuthInterface>(`${this.API}/signin`, { username, password })
      .pipe(
        map((cred) => {
          this.storage.set(cred);
          this.authState = this.storage.get<AuthInterface>();
          return cred;
        })
      );
  }

  signUp(user: UserInterface) {
    return this.userService.addUser(user);
  }

  signOut() {
    this.storage.delete();
    this.authState = this.storage.get<null>();
  }

}
