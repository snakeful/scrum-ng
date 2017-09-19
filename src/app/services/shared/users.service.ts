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
  private stakeholderUsers: User[];
  private administratorUsers: User[];
  constructor() {
    this.roles = [
      new Role(0, 'Product Owner'),
      new Role(1, 'Scrum Master'),
      new Role(2, 'Scrum Team'),
      new Role(3, 'Stakeholders'),
      new Role(4, 'Administrators')
    ];
    this.productOwnerUsers = [
      new User(0, 'Product Owner 1', undefined, 0),
      new User(1, 'Product Owner 2', undefined, 0),
      new User(2, 'Product Owner 3', undefined, 0),
      new User(3, 'Product Owner 4', undefined, 0)
    ];
    this.scrumMasterUsers = [
      new User(4, 'Scrum Master 1', undefined, 1),
      new User(5, 'Scrum Master 2', undefined, 1),
      new User(6, 'Scrum Master 3', undefined, 1),
      new User(7, 'Scrum Master 4', undefined, 1)
    ];
    this.scrumTeamUsers = [
      new User(8, 'Scrum Team 1', undefined, 2),
      new User(9, 'Scrum Team 2', undefined, 2),
      new User(10, 'Scrum Team 3', undefined, 2),
      new User(11, 'Scrum Team 4', undefined, 2)
    ];
    this.stakeholderUsers = [
      new User(12, 'Stakeholder 1', undefined, 3),
      new User(13, 'Stakeholder 2', undefined, 3),
      new User(14, 'Stakeholder 3', undefined, 3),
      new User(15, 'Stakeholder 4', undefined, 3)
    ];
    this.administratorUsers = [
      new User(16, 'Administrator 1', undefined, 4),
      new User(17, 'Administrator 2', undefined, 4),
      new User(18, 'Administrator 3', undefined, 4),
      new User(19, 'Administrator 4', undefined, 4)
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

  getStakeholderUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      resolve(this.stakeholderUsers);
    });
  }
}
