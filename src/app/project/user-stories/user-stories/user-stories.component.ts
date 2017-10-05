import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Project, UserStory } from '../../../services/shared/projects/projects.service';

@Component({
  selector: 'app-user-stories',
  templateUrl: './user-stories.component.html',
  styleUrls: ['./user-stories.component.css']
})
export class UserStoriesComponent implements OnInit {
  private _selectCurrentStory: Boolean = false;
  private _currentStory: UserStory;
  private _canDelete: Boolean = false;
  private _showUserStoryModal: Boolean = false;
  @Input() userStory: UserStory[];
  @Input() showDescription: Boolean = true;
  @Output() onSelect: EventEmitter<UserStory> = new EventEmitter<UserStory>();
  constructor() {
    this.userStory = [];
  }

  ngOnInit() {
    if (this.userStory.length > 0) {
      this.selectStory(this.userStory[0]);
    }
  }

  selectStory(story) {
    this._currentStory = story;
    this.onSelect.emit(story);
  }

  doDeleteUserStory(story) {
    this.userStory.splice(this.userStory.indexOf(story), 1);
  }

  doEditUserStory(story) {
    this.userStory.splice(this.userStory.indexOf(story), 1);
  }

  editUserStory(value: any) {
    console.log(value);
  }

  get userStories(): UserStory[] {
    return this.userStory || [];
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

  get showUserStoryModal(): Boolean {
    return this._showUserStoryModal;
  }
}
