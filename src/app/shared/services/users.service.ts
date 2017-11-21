import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { isNil } from 'lodash';
import { LocalStorageService } from 'ng2-webstorage';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ScrumUser, User, UserLogged } from '../classes/users.class';
import { Project } from '../classes/projects.class';

@Injectable()
export class UsersService {
  private _user: UserLogged;
  private url: string;
  private _users: User[];
  private loaded: boolean;
  constructor(private http: Http, private storage: LocalStorageService) {
    this._user = this.storage.retrieve('user') as UserLogged;
    this.url = this.storage.retrieve('server');
  }

  private handleError(err: Response) {
    const msg = `<p>Error status code ${err.status} type ${err.type} at ${err.url}</p><p><bold>${err.json().err}</bold></p>`;
    return Observable.throw(msg);
  }

  loadData(): Promise<boolean> {
    if (this.loaded) {
      return Promise.resolve(true);
    }
    return new Promise<boolean>(resolve => {
      const resolved = Promise.all([
        this.http.get(`${this.url}/api/users`).map(data => data.json() as User[]).toPromise()]);
      resolved.then(data => {
        this._users = data[0];
        this.setUserPrivileges();
        this.loaded = true;
        resolve(this.loaded);
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

  setUserPrivileges(project?: Project) {
    if (!isNil(this._users) && !isNil(this._user)) {
      this._users.forEach(user => {
        if (this._user.user === user.user) {
          this._user.admin = user.admin;
          if (!isNil(project)) {
            this._user.productOwner = project.productOwnerId === user.id;
            this._user.scrumMaster = project.scrumMasterId === user.id;
            this._user.scrumUser = project.scrumTeam.indexOf(user.id) >= 0;
            this._user.stakeholder = project.stakeholders.indexOf(user.id) >= 0;
          }
        }
      });
    }
  }

  get userLogged(): UserLogged {
    return this._user;
  }

  get users(): User[] {
    return this._users;
  }

  get userLoggedIsAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.loaded) {
        this.setUserPrivileges();
        resolve(!isNil(this._user) && this._user.admin);
      } else {
        this.loadData().then((data: boolean) => {
          this.setUserPrivileges();
          resolve(!isNil(this._user) && this._user.admin);
        }).catch(reject);
      }
    });
  }

  get userIsLogged(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(!isNil(this._user));
    });
  }
}
