import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { UserStory, ProjectsService } from '../../services/shared/projects/projects.service';

@Component({
  selector: 'app-user-story-modal',
  templateUrl: './user-story-modal.component.html',
  styleUrls: ['./user-story-modal.component.css']
})
export class UserStoryModalComponent implements OnInit, AfterViewInit {
  private _userStory: UserStory = new UserStory(undefined, null, null, null, 10, 0);
  @Output() private saveUserStory: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dataUserStoryModalClose') private btnClose: ElementRef;
  constructor(private projectsService: ProjectsService, private alert: NotificationsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  doSaveUserStory(userStory: UserStory) {
    let newStory: Boolean = userStory.id === null || userStory.id === undefined;
    userStory.projectId = 0; // TODO Add project id.
    (newStory ? this.projectsService.createUserStory(userStory) : this.projectsService.saveUserStory(userStory))
    .subscribe(userStory => {
      this.alert.success(`User Story ${userStory.name}`, `User Story ${newStory ? 'created' : 'saved'}.`, {
        timeOut: 2000,
        showProgressBar: false
      });
      this.saveUserStory.emit({
        user: userStory,
        btnClose: this.btnClose
      });
    });
    this.saveUserStory.emit({
      userStory: userStory,
      btnClose: this.btnClose
    });
    this._userStory = new UserStory(undefined, null, null, null, 10, 0);
  }

  get userStory(): UserStory {
    return this._userStory;
  }

  @Input() set userStory(value: UserStory) {
    this._userStory = value;
  }
}
