import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProjectsService, Sprint, UserStory } from '../../../services/shared/projects/projects.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {
  private _selectCurrentSprint: Boolean;
  private _currentSprint: Sprint;
  private _canDelete: Boolean;
  private deleting: Boolean;
  private _sprints: Sprint[];
  private _onSelect: EventEmitter<Sprint>;
  constructor(private service: ProjectsService, private alert: NotificationsService) {
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

  get canDelete(): Boolean {
    return this._canDelete;
  }

  @Input() set canDelete(value: Boolean) {
    this._canDelete = value;
  }

  @Output() get onSelect(): EventEmitter<Sprint> {
    return this._onSelect;
  }
}
