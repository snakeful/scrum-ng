import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project, UserStory } from '../../services/projects/projects.service';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {
  @Input() object: any;
  @Output() onSelect: EventEmitter<UserStory> = new EventEmitter<UserStory>();
  private _selectCurrentStory: Boolean = false;
  private _currentStory: UserStory;

  constructor() { }

  ngOnInit() {
    if (this.object.userStories.length > 0) {
      this.selectStory(this.object.userStories[0]);
    }
  }

  selectStory (story) {
    if (this._selectCurrentStory) {
      this._currentStory = story;
      this.onSelect.emit(story);
    }
  }

  get currentStory (): UserStory {
    return this._currentStory;
  }

  get selectCurrentStory (): Boolean {
    return this._selectCurrentStory;
  }

  @Input() set selectCurrentStory (value) {
    this._selectCurrentStory = value;
  }
}
