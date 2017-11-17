import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { isNil } from 'lodash';
import { NotificationsService } from 'angular2-notifications';

import { User, UserLogged } from '../../shared/classes/users.class';
import { UsersService } from '../../shared/services/users.service';
import { Project } from '../../shared/classes/projects.class';
import { ProjectsService } from '../../shared/services/projects.service';

@Component({
  selector: 'scrum-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  private _projectForm: FormGroup;
  private _users: User[] = [];
  private _scrumTeam: User[] = [];
  private _stakeholders: User[] = [];
  private _selectedScrumTeamId: number;
  private _selectedStakeholderId: number;
  private _onSaveProject: EventEmitter<Project>;
  constructor(private service: ProjectsService, private usersService: UsersService, private builder: FormBuilder,
    private alert: NotificationsService) {
    this._projectForm = builder.group({
      id: [null],
      name: [{
        value: '',
        disabled: !this.user.admin
      }, Validators.required],
      desc: [{
        value: '',
        disabled: !this.user.admin
      }],
      productOwnerId: [{
        value: null,
        disabled: !this.user.admin
      }, Validators.required],
      scrumMasterId: [{
        value: null,
        disabled: !this.user.admin
      }, Validators.required],
      scrumTeam: [[]],
      stakeholders: [[]],
      statusId: [0]
    });
    this._onSaveProject = new EventEmitter<Project>();
  }

  ngOnInit() { }

  onChangeUserList(selectedId: number, userIdList: number[], userList: User[]) {
    if (isNil(selectedId)) {
      return;
    }
    let user: User;
    this._users.forEach(userCheck => {
      if (userCheck.id === selectedId) {
        user = userCheck;
      }
    });

    if (user && !userIdList.reduce((exists, id) => {
      return exists || id === user.id;
    }, false)) {
      userIdList.push(user.id);
      userList.push(user);
    }
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

  saveProject(project: Project) {
    this.service.saveProject(project)
      .subscribe(obj => {
        this._onSaveProject.emit(obj);
        this.alert.success(`Project ${project.name}`, `Project saved.`, {
          timeOut: 2000,
          showProgressBar: false
        });
      }, err => this.alert.html(err, 'error', {
        timeOut: 10000
      }));
  }

  get projectForm(): FormGroup {
    return this._projectForm;
  }

  get scrumTeam(): User[] {
    return this._scrumTeam;
  }

  get stakeholders(): User[] {
    return this._stakeholders;
  }

  @Input() set project(value: Project) {
    this.scrumTeam.length = 0;
    this.stakeholders.length = 0;
    this.selectedScrumTeamId = null;
    this.selectedStakeholderId = null;
    this.usersService.getUsers()
    .subscribe(users => {
      this._users = users;
      if (isNil(value)) {
        this._projectForm.patchValue(new Project());
      } else {
        this._projectForm.patchValue(value);
      }
      this._projectForm.value.scrumTeam.forEach(id => {
        this._users.forEach(user => {
          if (user.id === id) {
            this.scrumTeam.push(user);
          }
        });
      });
      this._projectForm.value.stakeholders.forEach(id => {
        this._users.forEach(user => {
          if (user.id === id) {
            this.stakeholders.push(user);
          }
        });
      });
    },
    err => this.alert.html(err, 'error', {
      timeOut: 10000
    }));
  }

  get users(): User[] {
    return this._users;
  }

  get selectedScrumTeamId(): number {
    return this._selectedScrumTeamId;
  }

  set selectedScrumTeamId(value: number) {
    this._selectedScrumTeamId = value;
  }

  get selectedStakeholderId(): number {
    return this._selectedStakeholderId;
  }

  set selectedStakeholderId(value: number) {
    this._selectedStakeholderId = value;
  }
  
    @Output() get onSaveProject(): EventEmitter<Project> {
      return this._onSaveProject;
    }
  
  get user(): UserLogged {
    return this.usersService.userLogged;
  }
}
