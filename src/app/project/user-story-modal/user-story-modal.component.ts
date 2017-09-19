import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { UserStory } from '../../services/shared/projects.service';

@Component({
  selector: 'app-user-story-modal',
  templateUrl: './user-story-modal.component.html',
  styleUrls: ['./user-story-modal.component.css']
})
export class UserStoryModalComponent implements OnInit, AfterViewInit {
  private _id = 0;
  private _userStory: UserStory = new UserStory(++this._id, 'Test', 'This is a test.', 10, 0);
  private _saveUserStory: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dataUserStoryModalClose') private btnClose: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  doSaveUserStory(story) {
    this._saveUserStory.emit({
      userStory: story,
      btnClose: this.btnClose
    });
    this._userStory = new UserStory(++this._id, 'Test', 'This is a test.', 10, 0);
  }

  get userStory(): UserStory {
    return this._userStory;
  }

  @Input() set userStory(value: UserStory) {
    this._userStory = value;
  }

  @Output() get saveUserStory(): EventEmitter<any> {
    return this._saveUserStory;
  }

}
