import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { UserLogged } from '../../../shared/classes/users.class';
import { UsersService } from '../../../shared/services/users.service';
import { Project, UserStory, Sprint } from '../../../shared/classes/projects.class';
import { ProjectsService } from '../../../shared/services/projects.service';

@Component({
  selector: 'scrum-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {
  private _selectCurrentSprint: boolean;
  private _currentSprint: Sprint;
  private _canDelete: boolean;
  private deleting: boolean;
  private _sprints: Sprint[];
  private _onSelect: EventEmitter<Sprint>;
  private _project: Project;
  constructor(private service: ProjectsService, private usersService: UsersService, private modalService: NgbModal,
    private alert: NotificationsService) {
    this._selectCurrentSprint = false;
    this._canDelete = false;
    this._sprints = [];
    this._onSelect = new EventEmitter<Sprint>();
  }

  ngOnInit() {
  }

  selectSprint(sprint) {
    this._currentSprint = sprint;
    this.onSelect.emit(sprint);
  }

  deleteSprint(sprint) {
    this.deleting = true;
    this.service.deleteSprint(sprint)
      .subscribe(deleted => {
        this._sprints.splice(this._sprints.indexOf(sprint), 1);
        this.alert.success('Sprints', `Sprint ${sprint.name} deleted.`, {
          timeOut: 2000
        });
        this.deleting = false;
      },
      (err) => {
        this.deleting = false;
        this.alert.html(err, 'error', {
          timeOut: 10000
        });
      });
  }

  assignStoryToSprintStories(sprint: Sprint, story: UserStory) {
    this.service.assignUserStoryToSprint(sprint, story)
      .subscribe(assigned => {
        sprint.userStories.push(story);
        this.alert.success('Sprints', `User story ${story.name} assigned.`, {
          timeOut: 2000
        });
      }, err => {
        this.deleting = false;
        this.alert.html(err, 'error', {
          timeOut: 10000
        });
      });
  }

  onStoryToSprintDrop(event, sprint: Sprint) {
    this.assignStoryToSprintStories(sprint, event.dragData);
  }

  unassignedUserStoryFromSprint(sprint: Sprint, story: UserStory) {
    this.service.unassignUserStoryFromSprint(sprint, story)
      .subscribe(unassigned => {
        sprint.userStories.splice(sprint.userStories.indexOf(story), 1);
        this.alert.success('Sprints', `User story ${story.name} unassigned.`, {
          timeOut: 2000
        });
      }, err => {
        this.deleting = false;
        this.alert.html(err, 'error', {
          timeOut: 10000
        });
      });
  }

  get sprints(): Sprint[] {
    return this._sprints;
  }

  @Input() set sprints(value: Sprint[]) {
    this._sprints = value;
  }

  get canDelete(): boolean {
    return this._canDelete;
  }

  @Input() set canDelete(value: boolean) {
    this._canDelete = value;
  }

  @Output() get onSelect(): EventEmitter<Sprint> {
    return this._onSelect;
  }

  get project(): Project {
    return this._project;
  }

  @Input() set project(value: Project) {
    this.usersService.setUserPrivileges(value);
    this._project = value;
  }

  get user(): UserLogged {
    return this.usersService.userLogged;
  }
}
