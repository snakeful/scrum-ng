import { Pipe, PipeTransform } from '@angular/core';

import { Role, UsersService } from '../services/shared/users/users.service';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {
  private roles: Role[] = [];
  constructor(private usersService: UsersService) {
    usersService.getRoles()
      .subscribe(roles => {
        this.roles = roles;
      });
  }

  transform(value: number, field: string): string {
    for (let index = 0; index < this.roles.length; index++) {
      const role: Role = this.roles[index];
      if (role.id === value) {
        return role[field];
      }
    }
    return 'Role not found';
  }

}
