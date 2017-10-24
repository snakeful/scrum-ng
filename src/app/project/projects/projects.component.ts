import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { cloneDeep } from 'lodash';

import { UsersService, User } from '../../services/shared/users/users.service';
import { ProjectsService, Project } from '../../services/shared/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  private _projects: Project[];
  private _actual: Project;
  private _selected: Project = new Project();
  private _users: User[] = [];
  private _scrumTeam: User[] = [];
  private _stakeholders: User[] = [];
  @ViewChild('dataUserStoryClose') private btnClose: ElementRef;
  constructor(private projectsService: ProjectsService, private usersService: UsersService, private alert: NotificationsService) {
  }

  ngOnInit() {
    this.projectsService.projects.subscribe(projects => {
      this._projects = projects;
    }, err => this.alert.html(err, 'error', {
      timeOut: 10000
    }));
    this.usersService.getUsers()
      .subscribe(users => this._users = users,
      err => this.alert.html(err, 'error', {
        timeOut: 10000
      }));
  }

  ngAfterViewInit() {
  }

  onChangeScrumTeam(project) {
    const user = this._users[project.selectedUser];
    if (!project.scrumTeam.reduce((exists, scrumUser) => {
      return exists || scrumUser.id === user.id;
    }, false)) {
      project.scrumTeam.push(user.id);
      this.scrumTeam.push(user);
    }
  }

  onChangeStakeholder(project) {
    const user = this._users[project.selectedUser];
    if (!project.stakeholders.reduce((exists, stakeholder) => {
      return exists || stakeholder.id === user.id;
    }, false)) {
      project.stakeholders.push(user.id);
      this.stakeholders.push(user);
    }
  }

  doSaveProject(project) {
    if (this._actual) {
      this.projectsService.saveProject(project)
        .subscribe(() => {
          this._projects[this._projects.indexOf(this._actual)] = project;
          this.alert.success(`Project ${project.name}`, `Project saved.`, {
            timeOut: 2000,
            showProgressBar: false
          });
        });
    } else {
      this._actual = null;
      this.projectsService.createProject(project)
        .subscribe(newProject => {
          this._projects.push(newProject);
          this.alert.success(`Project ${newProject.name}`, `Project created.`, {
            timeOut: 2000,
            showProgressBar: false
          });
        });
    }
    this.btnClose.nativeElement.click();
  }

  doRemoveScrumTeam(project: Project, user: User) {
    project.scrumTeam.splice(project.scrumTeam.indexOf(user.id), 1);
    this.scrumTeam.forEach((scrumUser, index, list) => {
      if (scrumUser.id === user.id) {
        list.splice(index, 1);
      }
    });
  }

  doRemoveStakeholder(project: Project, user: User) {
    project.stakeholders.splice(project.stakeholders.indexOf(user.id), 1);
    this.stakeholders.forEach((stakeholder, index, list) => {
      if (stakeholder.id === user.id) {
        list.splice(index, 1);
      }
    });
  }

  get projects(): Project[] {
    return this._projects;
  }

  get actual(): Project {
    return this._actual;
  }

  set projects(value: Project[]) {
    this._projects = value;
  }

  get selected(): Project {
    return this._selected;
  }

  set selected(value: Project) {
    this.scrumTeam.length = 0;
    this.stakeholders.length = 0;
    if (value) {
      this._actual = value;
      this._selected = cloneDeep(value);
      value.scrumTeam.forEach(id => {
        this._users.forEach(user => {
          if (user.id === id) {
            this.scrumTeam.push(user);
          }
        });
      });
      value.stakeholders.forEach(id => {
        this._users.forEach(user => {
          if (user.id === id) {
            this.stakeholders.push(user);
          }
        });
      });
    } else {
      this._actual = null;
      this._selected = new Project(this._projects.length + 1);
    }
  }

  get users(): User[] {
    return this._users;
  }

  get scrumTeam(): User[] {
    return this._scrumTeam;
  }

  get stakeholders(): User[] {
    return this._stakeholders;
  }
}
