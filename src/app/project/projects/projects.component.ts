import { Component, OnInit } from '@angular/core';

import { UsersService, User } from '../../services/shared/users.service';
import { ProjectsService, Project } from '../../services/shared/projects.service';

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
  constructor(private projectsService: ProjectsService, private usersService: UsersService) {
  }

  ngOnInit() {
    this.projectsService.getProjects()
      .then((projects) => {
        this._projects = projects;
      });

    this.usersService.getProductOwnerUsers()
      .then(users => {
        this._productOwnerUsers = users;
      });

    this.usersService.getScrumMasterUsers()
      .then(users => {
        this._scrumMasterUsers = users;
      });

    this.usersService.getScrumTeamUsers()
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
