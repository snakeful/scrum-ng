import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Project, UserStory } from '../../services/shared/projects/projects.service';

@Component({
  selector: 'app-user-stories',
  templateUrl: './user-stories.component.html',
  styleUrls: ['./user-stories.component.css']
})
export class UserStoriesComponent implements OnInit {
  private _selectCurrentStory: Boolean = false;
  private _currentStory: UserStory;
  private _canDelete: Boolean = false;
  private _canEdit: Boolean = false;
  @Input() object: UserStory[];
  @Input() showDescription: Boolean = true;
  @Output() onSelect: EventEmitter<UserStory> = new EventEmitter<UserStory>();
  constructor() {
    this.object = [];
  }

  ngOnInit() {
    if (this.object.length > 0) {
      this.selectStory(this.object[0]);
    }
  }

  selectStory(story) {
    if (this._selectCurrentStory) {
      this._currentStory = story;
      this.onSelect.emit(story);
    }
  }

  doDeleteUserStory(story) {
    this.object.splice(this.object.indexOf(story), 1);
  }
  
  doEditUserStory(story) {
    this.object.splice(this.object.indexOf(story), 1);
  }

  get userStories(): UserStory[] {
    return this.object || [];
  }

  get currentStory(): UserStory {
    return this._currentStory;
  }

  get selectCurrentStory(): Boolean {
    return this._selectCurrentStory;
  }

  @Input() set selectCurrentStory(value) {
    this._selectCurrentStory = value;
  }

  get canDelete(): Boolean {
    return this._canDelete;
  }

  @Input() set canDelete(value: Boolean) {
    this._canDelete = value;
  }

  get canEdit(): Boolean {
    return this._canEdit;
  }

  @Input() set canEdit(value: Boolean) {
    this._canEdit = value;
  }
}
