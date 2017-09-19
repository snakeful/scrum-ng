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

  transform(value: number, field: string): string {
    for (let index = 0; index < this._roles.length; index++) {
      const role: Role = this._roles[index];
      if (role.id === value)  {
        return role[field];
      }
    }
    return 'Role not found';
  }

}
