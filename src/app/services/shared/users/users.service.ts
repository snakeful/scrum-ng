import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

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
  roleId: number;
  constructor(id?: number, user?: string, firstName?: string, lastName?: string, roleId?: number) {
    this.id = id;
    this.user = user;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
  }
}

export class Role extends ScrumObject {
}

export class User extends ScrumUser {
}

@Injectable()
export class UsersService {
  private url = 'http://localhost:4201';
  private roles: Role[];
  private users: User[];
  constructor(private http: Http) {
  }

  private handleError(err: Response) {
    console.log(err);
    const msg = `<p>Error status code ${err.status} type ${err.type} at ${err.url}</p><p><bold>${err.json().err}</bold></p>`;
    return Observable.throw(msg);
  }

  public getRoles(): Observable<Role[]> {
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
}
