import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProjectsService, Project, UserStory } from '../../../services/shared/projects/projects.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user-stories',
  templateUrl: './user-stories.component.html',
  styleUrls: ['./user-stories.component.scss']
})
export class UserStoriesComponent implements OnInit {
  private _selectCurrentStory: Boolean;
  private _currentStory: UserStory;
  private _canDelete: Boolean;
  private deleting: Boolean;
  private _showDescription: Boolean;
  private _onSelect: EventEmitter<UserStory>;
  private _userStories: UserStory[];
  constructor(private projectsService: ProjectsService, private alert: NotificationsService) {
    this._userStories = [];
    this._selectCurrentStory = false;
    this._canDelete = false;
    this.deleting = false;
    this._showDescription = true;
    this._onSelect = new EventEmitter<UserStory>();
  }

  ngOnInit() {
    if (this._userStories.length > 0) {
      this.selectStory(this._userStories[0]);
    }
  }

  selectStory(story: UserStory) {
    if (!this.deleting) {
      this._currentStory = story;
      this._onSelect.emit(story);
    }
  }

  deleteUserStory(story: UserStory) {
    this.deleting = true;
    this.projectsService.deleteUserStory(story)
      .subscribe(deleted => {
        this._userStories.splice(this._userStories.indexOf(story), 1);
        this.deleting = false;
      },
      (err) => {
        this.deleting = false;
        this.alert.html(err, 'error', {
          timeOut: 10000
        });
      });
  }

  get userStories(): UserStory[] {
    return this._userStories || [];
  }

  get currentStory(): UserStory {
    return this._currentStory;
  }

  get selectCurrentStory(): Boolean {
    return this._selectCurrentStory;
  }

  @Input() set selectCurrentStory(value: Boolean) {
    this._selectCurrentStory = value;
  }

  get showDescription(): Boolean {
    return this._showDescription;
  }

  @Input() set showDescription(value: Boolean) {
    this._showDescription = value;
  }

  get canDelete(): Boolean {
    return this._canDelete;
  }

  @Input() set canDelete(value: Boolean) {
    this._canDelete = value;
  }

  @Output() get onSelect(): EventEmitter<UserStory> {
    return this._onSelect;
  }

  @Input() set userStories(value: UserStory[]) {
    this._userStories = value;
  }
}
