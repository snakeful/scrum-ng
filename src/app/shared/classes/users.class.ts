

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
  email: string;
  password: string;
  confirm: string;
  admin: boolean;
  constructor(id?: number, user?: string, firstName?: string, lastName?: string, email?: string) {
    this.id = id;
    this.user = user;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = null;
    this.confirm = null;
    this.admin = false;
  }
}

export class UserLogged {
  user: string;
  firstName: string;
  lastName: string;
  admin = false;
  token: string;
  expiration: Date;
  productOwner = false;
  scrumMaster = false;
  scrumUser = false;
  stakeholder = false;
}

export class Role extends ScrumObject {
}

export class User extends ScrumUser {
  clearPasswords() {
    this.password = null;
    this.confirm = null;
  }
}
