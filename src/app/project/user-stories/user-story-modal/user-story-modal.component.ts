import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { UserStory, ProjectsService } from '../../../services/shared/projects/projects.service';

@Component({
  selector: 'app-user-story-modal',
  templateUrl: './user-story-modal.component.html',
  styleUrls: ['./user-story-modal.component.css']
})
export class UserStoryModalComponent implements OnInit, AfterViewInit {
  private _userStory: UserStory;
  private _sendUserStory: EventEmitter<any>;
  @ViewChild('dataUserStoryModalClose') private btnClose: ElementRef;
  constructor(private service: ProjectsService, private alert: NotificationsService) {
    this._userStory = new UserStory(undefined, null, null, null, 10, 0);
    this._sendUserStory = new EventEmitter<any>();
  }

  ngOnInit() { }

  ngAfterViewInit() { }

  saveUserStory(userStory: UserStory) {
    this.service.saveUserStory(userStory)
      .subscribe(story => {
        this.sendUserStory.emit(story);
        this.btnClose.nativeElement.click();
        this.alert.success('User Story', 'User story saved.', {
          timeOut: 3000
        });
      }, err => {
        this.alert.error('User Story', err, {
          timeOut: 10000
        });
      });
  }

  get userStory(): UserStory {
    return this._userStory;
  }

  @Input() set userStory(value: UserStory) {
    this._userStory = Object.assign({}, value);
  }

  @Output() get sendUserStory(): EventEmitter<any> {
    return this._sendUserStory;
  }
}
