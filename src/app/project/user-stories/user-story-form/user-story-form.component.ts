import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { isNil } from 'lodash';
import { NotificationsService } from 'angular2-notifications';

import { UserLogged } from '../../../shared/classes/users.class';
import { UsersService } from '../../../shared/services/users.service';
import { UserStory, StoryPriority } from '../../../shared/classes/projects.class';
import { ProjectsService } from '../../../shared/services/projects.service';

@Component({
  selector: 'scrum-user-story-form',
  templateUrl: './user-story-form.component.html',
  styleUrls: ['./user-story-form.component.scss']
})
export class UserStoryFormComponent implements OnInit {
  private _userStoryForm: FormGroup;
  private _userStory: UserStory;
  private _priorities: StoryPriority[];
  private _onSaveUserStory: EventEmitter<UserStory>;
  constructor(private service: ProjectsService, private usersService: UsersService, private builder: FormBuilder,
    private alert: NotificationsService) {
    this._userStoryForm = this.builder.group({
      id: [0],
      name: [{
        value: '',
        disabled: !(this.user.admin || this.user.scrumMaster)
      }, Validators.required],
      desc: [{
        value: '',
        disabled: !(this.user.admin || this.user.scrumMaster)
      }],
      projectId: [0],
      statusId: [0],
      priorityId: [{
        value: 0,
        disabled: !(this.user.admin || this.user.scrumMaster)
      }, Validators.required]
    });
    this._userStory = new UserStory(undefined, null, null, null, 10, 0);
    this._onSaveUserStory = new EventEmitter<UserStory>();
  }

  ngOnInit() {
    this.service.priorities.then(priorities => {
      this._priorities = priorities;
    });
  }

  saveUserStory(userStory: UserStory) {
    this.service.saveUserStory(userStory)
      .subscribe(story => {
        this.onSaveUserStory.emit(story);
        this.alert.success('User Story', 'User story saved.', {
          timeOut: 2000
        });
      }, err => {
        this.alert.error('User Story', err, {
          timeOut: 10000
        });
      });
  }

  get userStoryForm(): FormGroup {
    return this._userStoryForm;
  }

  get userStory(): UserStory {
    return this._userStory;
  }

  @Input() set userStory(value: UserStory) {
    this._userStoryForm.patchValue(value || new UserStory());
  }

  get priorities(): StoryPriority[] {
    return this._priorities;
  }

  @Output() get onSaveUserStory(): EventEmitter<UserStory> {
    return this._onSaveUserStory;
  }

  get user(): UserLogged {
    return this.usersService.userLogged;
  }
}
