import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { LocalStorageService } from 'ng2-webstorage';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class ScrumObject {
  id: number;
  name: string;
  desc: string;
  constructor(id?: number, name?: string, desc?: string) {
    this.id = id;
    this.name = name;
    this.desc = desc;
  }
}

export class ScrumUser {
  id: number;
  user: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm: string;
  admin: boolean;
  constructor(id?: number, user?: string, firstName?: string, lastName?: string) {
    this.id = id;
    this.user = user;
    this.firstName = firstName;
    this.lastName = lastName;
    this.admin = false;
  }
}

export class UserLogged {
  user: string;
  admin: boolean;
  token: string;
  expiration: Date;
}

export class Role extends ScrumObject {
}

export class User extends ScrumUser {
  clearPasswords() {
    this.password = null;
    this.confirm = null;
  }
}

@Injectable()
export class UsersService {
  private _user: UserLogged;
  private url = 'http://localhost:4201';
  private roles: Role[];
  private users: User[];
  constructor(private http: Http, private storage: LocalStorageService) {
    this._user = this.storage.retrieve('user') as UserLogged;
  }

  private handleError(err: Response) {
    const msg = `<p>Error status code ${err.status} type ${err.type} at ${err.url}</p><p><bold>${err.json().err}</bold></p>`;
    return Observable.throw(msg);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get(`${this.url}/api/roles`)
    .map(res => res.json() as Role[])
    .catch(this.handleError);
  }

  getUsers(): Observable<User[]> {
    return this.http.get(`${this.url}/api/users`)
    .map(res => res.json() as User[])
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

  get userLogged(): UserLogged {
    return this._user;
  }
}
