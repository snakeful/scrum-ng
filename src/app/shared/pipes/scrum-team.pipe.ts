import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../classes/users.class';
import { UsersService } from '../../shared/services/users.service';

@Pipe({
  name: 'scrumTeam'
})
export class ScrumTeamPipe implements PipeTransform {
  private users: User[] = [];
  constructor(private usersService: UsersService) {
  }
  transform(value: number, field: string): string {
    this.users = this.usersService.users;
    for (let index = 0; index < this.users.length; index++) {
      const user = this.users[index];
      if (user.id === value) {
        return field === 'full' ? `${user.user} - ${user.firstName} ${user.lastName}` :
          (field === 'fullName' ? `${user.firstName} ${user.lastName}` : user[field]);
      }
    }
    return '';
  }

}
