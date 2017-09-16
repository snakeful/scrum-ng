import { Component, OnInit } from '@angular/core';
import { ProjectsService, User, Project } from '../../services/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  private _projects: Project[];
  private _productOwnerUsers: User[];
  private _scrumMasterUsers: User[];
  private _scrumTeamUsers: User[];
  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit() {
    this.projectsService.getProjects()
      .then((projects) => {
        this._projects = projects;
      });

    this.projectsService.getProductOwnerUsers()
      .then(users => {
        this._productOwnerUsers = users;
      });

    this.projectsService.getScrumMasterUsers()
      .then(users => {
        this._scrumMasterUsers = users;
      });

    this.projectsService.getScrumTeamUsers()
      .then(users => {
        this._scrumTeamUsers = users;
      });
  }

  onChangeUser(project) {
    const user = this._scrumTeamUsers[project.selectedUser];
    if (project.scrumTeam.indexOf(user) === -1) {
      project.scrumTeam.push(user);
    }
  }

  doRemoveUser(project, user) {
    project.scrumTeam.splice(project.scrumTeam.indexOf(user), 1);
  }

  get projects(): Project[] {
    return this._projects;
  }

  set projects(value: Project[]) {
    this._projects = value;
  }

  get productOwnerUsers(): User[] {
    return this._productOwnerUsers;
  }

  get scrumMasterUsers(): User[] {
    return this._scrumMasterUsers;
  }

  get scrumTeamUsers(): User[] {
    return this._scrumTeamUsers;
  }
}
