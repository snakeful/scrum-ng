import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProjectsService, Project, UserStory } from '../../../services/shared/projects/projects.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user-stories',
  templateUrl: './user-stories.component.html',
  styleUrls: ['./user-stories.component.css']
})
export class UserStoriesComponent implements OnInit {
  private _selectCurrentStory: Boolean;
  private _currentStory: UserStory;
  private _canDelete: Boolean;
  private deleting: Boolean;
  private _showDescription: Boolean;
  private _onSelect: EventEmitter<UserStory>;
  private _userStory: UserStory[];
  constructor(private projectsService: ProjectsService, private alert: NotificationsService) {
    this._userStory = [];
    this._selectCurrentStory = false;
    this._canDelete = false;
    this.deleting = false;
    this._showDescription = true;
    this._onSelect = new EventEmitter<UserStory>();
  }

  ngOnInit() {
    if (this._userStory.length > 0) {
      this.selectStory(this._userStory[0]);
    }
  }

  selectStory(story) {
    if (!this.deleting) {
      this._currentStory = story;
      this._onSelect.emit(story);
    }
  }

  doDeleteUserStory(story) {
    this.deleting = true;
    this.projectsService.deleteUserStory(story)
      .subscribe(deleted => {
        this._userStory.splice(this._userStory.indexOf(story), 1);
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
    return this._userStory || [];
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

  @Input() set userStory(value: UserStory[]) {
    this._userStory = value;
  }
}
