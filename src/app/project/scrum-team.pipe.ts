import { Pipe, PipeTransform } from '@angular/core';
import { User, ProjectsService } from '../services/shared/projects.service';

@Pipe({
  name: 'scrumTeam'
})
export class ScrumTeamPipe implements PipeTransform {
  private scrumTeamUsers: User[] = [];
  constructor(private projectsService: ProjectsService) {
    this.projectsService.getScrumTeamUsers()
      .then(users => {
        this.scrumTeamUsers = users;
      });
  }
  transform(value: string, field: string): string {
    const userId = parseInt(value, 0);
    for (let index = 0; index < this.scrumTeamUsers.length; index++) {
      const user = this.scrumTeamUsers[index];
      if (user.id === userId) {
        return user[field];
      }
    }
    return '';
  }

}
