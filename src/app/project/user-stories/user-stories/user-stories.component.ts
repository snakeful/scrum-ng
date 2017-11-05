import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { Project, UserStory } from '../../../shared/classes/projects.class';
import { ProjectsService } from '../../../shared/services/projects.service';

@Component({
  selector: 'app-user-stories',
  templateUrl: './user-stories.component.html',
  styleUrls: ['./user-stories.component.scss']
})
export class UserStoriesComponent implements OnInit {
  private _selectCurrentStory: boolean;
  private _currentStory: UserStory;
  private _canDelete: boolean;
  private deleting: boolean;
  private _showDescription: boolean;
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

  get selectCurrentStory(): boolean {
    return this._selectCurrentStory;
  }

  @Input() set selectCurrentStory(value: boolean) {
    this._selectCurrentStory = value;
  }

  get showDescription(): boolean {
    return this._showDescription;
  }

  @Input() set showDescription(value: boolean) {
    this._showDescription = value;
  }

  get canDelete(): boolean {
    return this._canDelete;
  }

  @Input() set canDelete(value: boolean) {
    this._canDelete = value;
  }

  @Output() get onSelect(): EventEmitter<UserStory> {
    return this._onSelect;
  }

  @Input() set userStories(value: UserStory[]) {
    this._userStories = value;
  }
}
