import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { UsersService, User } from '../../services/shared/users.service';
import { ProjectsService, Project } from '../../services/shared/projects.service';

import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  private _projects: Project[];
  private _productOwnerUsers: User[];
  private _scrumMasterUsers: User[];
  private _scrumTeamUsers: User[];
  private _actual: Project;
  private _selected: Project = new Project();
  @ViewChild('dataUserStoryClose') private btnClose: ElementRef;
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

  ngAfterViewInit() {
  }

  onChangeUser(project) {
    const user = this._scrumTeamUsers[project.selectedUser];
    if (project.scrumTeam.indexOf(user) === -1) {
      project.scrumTeam.push(user);
    }
  }

  doSaveProject(project) {
    if (this._actual) {
      this._projects[this._projects.indexOf(this._actual)] = project;
    } else {
      this._actual = null;
      this._projects.push(project);
    }
    this.btnClose.nativeElement.click();
  }

  doRemoveUser(project: Project, user: User) {
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

  get selected(): Project {
    return this._selected;
  }

  set selected(value: Project) {
    if (value) {
      this._actual = value;
      this._selected = cloneDeep(value);
    } else {
      this._actual = null;
      this._selected = new Project(this._projects.length + 1);
    }
  }
}
