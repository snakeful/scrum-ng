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
  private roles: Role[];
  private productOwnerUsers: User[];
  private scrumMasterUsers: User[];
  private scrumTeamUsers: User[];
  constructor() {
    this.roles = [
      new Role(0, 'Product Owner'),
      new Role(1, 'Scrum Master'),
      new Role(2, 'Scrum Team'),
      new Role(3, 'Stakeholders'),
      new Role(4, 'Administrators')
    ];
    this.productOwnerUsers = [
      new User(0, 'Test1', undefined, 0),
      new User(1, 'Test2', undefined, 0),
      new User(2, 'Test3', undefined, 0),
      new User(3, 'Test4', undefined, 0)
    ];
    this.scrumMasterUsers = [
      new User(4, 'Test5', undefined, 1),
      new User(5, 'Test6', undefined, 1),
      new User(6, 'Test7', undefined, 1),
      new User(7, 'Test8', undefined, 1)
    ];
    this.scrumTeamUsers = [
      new User(8, 'Test9', undefined, 2),
      new User(9, 'Test10', undefined, 2),
      new User(10, 'Test11', undefined, 2),
      new User(11, 'Test12', undefined, 2)
    ];
  }

  public getRoles(): Promise<Role[]> {
    return new Promise<Role[]>((resolve, reject) => {
      resolve(this.roles);
    });
  }
  
  getProductOwnerUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      resolve(this.productOwnerUsers);
    });
  }

  getScrumMasterUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      resolve(this.scrumMasterUsers);
    });
  }

  getScrumTeamUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      resolve(this.scrumTeamUsers);
    });
  }
}
