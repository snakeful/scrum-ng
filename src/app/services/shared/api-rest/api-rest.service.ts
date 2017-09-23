import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { ScrumObject } from "./../users.service";
import { Project } from './../projects.service';

class Api {
  url: string;
  resources: string[]
}

let apiRest: Api = {
  url: 'http://localhost:4201/api',
  resources: ['project']
};

@Injectable()
export class ApiRestService {
  private _api: any = {};
  constructor(private http: Http) {
    apiRest.resources.forEach(resource => {
      this._api[resource] = {
        get(): Promise<any> {
          return this.http.get(`${apiRest.url}/${resource}`).toPromise();
        },
        getById(id) {
          return this.http.get(`${apiRest.url}/${resource}/${id}`).toPromise();
        },
        post(data) {
          return this.http.post(`${apiRest.url}/${resource}`, JSON.stringify(data)).toPromise();
        },
        put(id, data) {
          return this.http.put(`${apiRest.url}/${resource}/${id}`, JSON.stringify(data)).toPromise();
        },
        del(id) {
          return this.http.delete(`${apiRest.url}/${resource}/${id}`).toPromise();
        }
      }
    });
  }
  public api(): any {
    return this._api;
  }
}
