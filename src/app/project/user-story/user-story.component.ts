import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserStory, StoryPriority, ProjectsService } from '../../services/shared/projects.service';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {
  private _id = 0;
  private _userStory: UserStory = new UserStory(--this._id, 'Test', 'This is a test.', 10, 0);
  private _saveUserStory: EventEmitter<UserStory> = new EventEmitter<UserStory>();
  private _priorities: StoryPriority[];
  constructor(private projectsService: ProjectsService) {
    projectsService.getPriorities().then(priorities => {
      this._priorities = priorities;
    });
  }

  ngOnInit() {
  }

  doSaveUserStory(story) {
    this._saveUserStory.emit(story);
    this._userStory = new UserStory(--this._id, 'Test', 'This is a test.', 10, 0);
  }

  get userStory(): UserStory {
    return this._userStory;
  }

  @Output() get saveUserStory(): EventEmitter<UserStory> {
    return this._saveUserStory;
  }

  get priorities(): StoryPriority[] {
    return this._priorities;
  }
}
