import { Pipe, PipeTransform } from '@angular/core';

import { Role, UsersService } from '../services/shared/users.service';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {
  private _roles: Role[];
  constructor(private usersService: UsersService) {
    usersService.getRoles().then(roles => {
      this._roles = roles;
    });
  }

  transform(value: string, field: string): string {
    const id: number = parseInt(value, 0);
    console.log(id);
    for (let index = 0; index < this._roles.length; index++) {
      const role: Role = this._roles[index];
      console.log(role);
      if (role.id === id)  {
        console.log(role[field]);
        return role[field];
      }
    }
    return 'Role not found';
  }

}
