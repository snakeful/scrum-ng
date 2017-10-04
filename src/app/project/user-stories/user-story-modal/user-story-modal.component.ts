import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { UserStory, ProjectsService } from '../../../services/shared/projects/projects.service';

@Component({
  selector: 'app-user-story-modal',
  templateUrl: './user-story-modal.component.html',
  styleUrls: ['./user-story-modal.component.css']
})
export class UserStoryModalComponent implements OnInit, AfterViewInit {
  private _userStory: UserStory;
  private _saveUserStory: EventEmitter<any>;
  @ViewChild('dataUserStoryModalClose') private btnClose: ElementRef;
  constructor(private projectsService: ProjectsService) {
    this._userStory = new UserStory(undefined, null, null, null, 10, 0);
    this._saveUserStory = new EventEmitter<any>();
  }

  ngOnInit() {
    console.log('OnInit');
  }

  ngAfterViewInit() {
  }

  doSaveUserStory(userStory: UserStory) {
    this.saveUserStory.emit({
      userStory: userStory,
      btnClose: this.btnClose
    });
  }

  get userStory(): UserStory {
    return this._userStory;
  }

  @Input() set userStory(value: UserStory) {
    if (value) {
      Object.assign(this._userStory, value);
    } else {
      this._userStory = new UserStory(undefined, null, null, null, 10, 0);
    }
  }

  @Output() get saveUserStory(): EventEmitter<any> {
    return this._saveUserStory;
  }
}
