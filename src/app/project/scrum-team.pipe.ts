import { Pipe, PipeTransform } from '@angular/core';
import { UsersService, User } from '../services/shared/users/users.service';
import { ProjectsService } from '../services/shared/projects/projects.service';

@Pipe({
  name: 'scrumTeam'
})
export class ScrumTeamPipe implements PipeTransform {
  private users: User[] = [];
  constructor(private projectsService: ProjectsService, private usersService: UsersService) {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }
  transform(value: number, field: string): string {
    for (let index = 0; index < this.users.length; index++) {
      const user = this.users[index];
      if (user.id === value) {
        return field === 'full' ? `${user.user} - ${user.firstName} ${user.lastName}` : user[field];
      }
    }
    return '';
  }

}
