import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { cloneDeep } from 'lodash';

import { UsersService, User } from '../../services/shared/users/users.service';
import { ProjectsService, Project } from '../../services/shared/projects/projects.service';

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
  private _stakeholderUsers: User[];
  private _actual: Project;
  private _selected: Project = new Project();
  @ViewChild('dataUserStoryClose') private btnClose: ElementRef;
  constructor(private projectsService: ProjectsService, private usersService: UsersService, private alert: NotificationsService) {
  }

  ngOnInit() {
    this.projectsService.getProjects()
      .subscribe(projects => {
        this._projects = projects;
      }, (err) => this.alert.html(err, 'error', {
        timeOut: 10000
      }));

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

    this.usersService.getStakeholderUsers()
      .then(users => {
        this._stakeholderUsers = users;
      });
  }

  ngAfterViewInit() {
  }

  onChangeUser(project) {
    const user = this._scrumTeamUsers[project.selectedUser];
    if (!project.scrumTeam.reduce((exists, scrumUser) => {
      return exists || scrumUser.id === user.id;
    }, false)) {
      project.scrumTeam.push(user);
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

  doRemoveUser(project: Project, user: User) {
    project.scrumTeam.forEach((scrumUser, index, list) => {
      if (scrumUser.id === user.id) {
        list.splice(index, 1);
      }
    });
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

  get stakeholderUsers(): User[] {
    return this._stakeholderUsers;
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
