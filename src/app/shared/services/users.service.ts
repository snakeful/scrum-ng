import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { LocalStorageService } from 'ng2-webstorage';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ScrumUser, User, UserLogged } from '../classes/users.class';

@Injectable()
export class UsersService {
  private _user: UserLogged;
  private url = 'http://localhost:4201';
  private _users: User[];
  private loaded: boolean;
  constructor(private http: Http, private storage: LocalStorageService) {
    this._user = this.storage.retrieve('user') as UserLogged;
  }

  private handleError(err: Response) {
    const msg = `<p>Error status code ${err.status} type ${err.type} at ${err.url}</p><p><bold>${err.json().err}</bold></p>`;
    return Observable.throw(msg);
  }

  loadData() {
    if (this.loaded) {
      return Promise.resolve();
    }
    return new Promise<any>(resolve => {
      const resolved = Promise.all([
        this.http.get(`${this.url}/api/users`).map(data => data.json() as User[]).toPromise()]);
      resolved.then(data => {
        this._users = data[0];
        this.loaded = true;
        resolve();
      });
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get(`${this.url}/api/users`)
    .map(res => {
      this._users = res.json() as User[];
      return this._users;
    })
    .catch(this.handleError);
  }

  getUser(id: number): Observable<User> {
    return this.http.get(`${this.url}/api/users/${id}`)
    .map(res => res.json() as User)
    .catch(this.handleError);
  }

  createUser(user: User): Observable<User> {
    return this.http.post(`${this.url}/api/users`, user)
    .map(res => {
      user.id = res.json();
      return user;
    })
    .catch(this.handleError);
  }

  saveUser(id: number, user: User): Observable<User> {
    return this.http.put(`${this.url}/api/users/${id}`, user)
    .map(res => user)
    .catch(this.handleError);
  }

  login(user: UserLogged) {
    this._user = Object.assign({}, user);
    this.storage.store('user', this._user);
  }

  logout() {
    this._user = null;
    this.storage.clear('user');
  }

  get userLogged(): UserLogged {
    return this._user;
  }

  get users(): User[] {
    return this._users;
  }
}
