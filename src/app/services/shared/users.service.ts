import { Injectable } from '@angular/core';


@Injectable()
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

export class Role extends ScrumObject {
}

export class User extends ScrumObject {
  roleId: number;
  constructor(id?: number, name?: string, desc?: string, roleId?: number) {
    super(id, name, desc);
    this.roleId = roleId;
  }
}

export class UsersService {

  constructor() { }

}
