import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Sprint, UserStory } from '../../../services/shared/projects/projects.service'

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsComponent implements OnInit {
  private _selectCurrentSprint: Boolean;
  private _currentSprint: Sprint;
  private _canDelete: Boolean = false;
  private _sprints: Sprint[];
  private _onSelect: EventEmitter<Sprint>;
  constructor() {
    this._selectCurrentSprint = false;
    this._canDelete = false;
    this._sprints = [];
    this._onSelect = new EventEmitter<Sprint>()
  }

  ngOnInit() {
  }
  
  selectSprint(sprint) {
    this._currentSprint = sprint;
    this.onSelect.emit(sprint);
  }
  
  assignStoryToSprintStories(sprint: Sprint, story: UserStory) {
    sprint.userStories.push(story);
  }

  onStoryToSprintDrop(event, sprint: Sprint) {
    this.assignStoryToSprintStories(sprint, event.dragData);
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
