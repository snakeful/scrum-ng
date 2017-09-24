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
      new User(0, 'owner1', 'Product', 'Owner 1', 0),
      new User(1, 'owner2', 'Product', 'Owner 2', 0),
      new User(2, 'owner3', 'Product', 'Owner 3', 0),
      new User(3, 'owner4', 'Product', 'Owner 4', 0)
    ];
    this.scrumMasterUsers = [
      new User(4, 'master1', 'Scrum', 'Master 1', 1),
      new User(5, 'master2', 'Scrum', 'Master 2', 1),
      new User(6, 'master3', 'Scrum', 'Master 3', 1),
      new User(7, 'master4', 'Scrum', 'Master 4', 1)
    ];
    this.scrumTeamUsers = [
      new User(8, 'team1', 'Scrum', ' Team 1', 2),
      new User(9, 'team2', 'Scrum', 'Team 2', 2),
      new User(10, 'team3', 'Scrum', 'Team 3', 2),
      new User(11, 'team4', 'Scrum', 'Team 4', 2)
    ];
    this.stakeholderUsers = [
      new User(12, 'stake1', 'Stakeholder', '1', 3),
      new User(13, 'stake2', 'Stakeholder', '2', 3),
      new User(14, 'stake3', 'Stakeholder', '3', 3),
      new User(15, 'stake4', 'Stakeholder', '4', 3)
    ];
    this.administratorUsers = [
      new User(16, 'admin1', 'Administrator', '1', 4),
      new User(17, 'admin2', 'Administrator', '2', 4),
      new User(18, 'admin3', 'Administrator', '3', 4),
      new User(19, 'admin4', 'Administrator', '4', 4)
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
