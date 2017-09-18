import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserStory } from "../../services/shared/projects.service";

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {
  private _userStory: UserStory = new UserStory();
  private _saveUserStory: EventEmitter<UserStory> = new EventEmitter<UserStory>();
  constructor() { }

  ngOnInit() {
  }

  doSaveUserStory(story) {
    this._saveUserStory.emit(story);
    this._userStory = new UserStory();
  }

  get userStory(): UserStory {
    return this._userStory;
  }

  @Output() get saveUserStory(): EventEmitter<UserStory> {
    return this._saveUserStory;
  }
}
