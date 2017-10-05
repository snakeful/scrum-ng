import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProjectsService, Sprint, UserStory } from '../../../services/shared/projects/projects.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsComponent implements OnInit {
  private _selectCurrentSprint: Boolean;
  private _currentSprint: Sprint;
  private _canDelete: Boolean;
  private deleting: Boolean;
  private _sprints: Sprint[];
  private _onSelect: EventEmitter<Sprint>;
  constructor(private projectsService: ProjectsService, private alert: NotificationsService) {
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
    this.projectsService.deleteSprint(sprint)
      .subscribe(deleted => {
        this._sprints.splice(this._sprints.indexOf(sprint), 1);
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
    sprint.userStories.push(story);
  }

  onStoryToSprintDrop(event, sprint: Sprint) {
    this.assignStoryToSprintStories(sprint, event.dragData);
  }

  deleteUserStoryFromSprint(sprint: Sprint, story: UserStory) {
    sprint.userStories.splice(sprint.userStories.indexOf(story), 1);
  }

  get sprints(): Sprint[] {
    return this._sprints;
  }

  @Input() set sprints(value: Sprint[]) {
    this._sprints = value;
  }

  @Input() canDelete(value: Boolean) {
    this._canDelete = value;
  }

  @Output() get onSelect(): EventEmitter<Sprint> {
    return this._onSelect;
  }
}
