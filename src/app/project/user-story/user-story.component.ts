import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Project, UserStory } from '../../services/shared/projects.service';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {
  private _selectCurrentStory: Boolean = false;
  private _currentStory: UserStory;

  @Input() object: any;
  @Input() showDescription: Boolean = true;
  private _canDelete: Boolean = false;
  @Output() onSelect: EventEmitter<UserStory> = new EventEmitter<UserStory>();
  constructor() { }

  ngOnInit() {
    if (this.object.userStories.length > 0) {
      this.selectStory(this.object.userStories[0]);
    }
  }

  selectStory(story) {
    if (this._selectCurrentStory) {
      this._currentStory = story;
      this.onSelect.emit(story);
    }
  }

  doDeleteUserStory(story) {
    this.object.userStories.splice(this.object.userStories.indexOf(story), 1);
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
}
