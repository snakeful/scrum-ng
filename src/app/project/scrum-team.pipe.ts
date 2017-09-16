import { Pipe, PipeTransform } from '@angular/core';
import { User, ProjectsService } from '../services/projects/projects.service';

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
  transform(value: number, field: string): string {
    for (let index = 0; index < this.scrumTeamUsers.length; index++) {
      let user = this.scrumTeamUsers[index];
      if (user.id === value) {
        return user[field];
      }
    }
    return '';
  }

}
