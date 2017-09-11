import { Component, OnInit, Input } from '@angular/core';
import { Project, UserStory } from '../../services/projects/projects.service';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {
  @Input() object: any;
  @Input() data: any;
  @Input() onSelectStory: Function;
  private _story: UserStory;
  constructor() { }

  ngOnInit() {
  }

  selectStory (story) {
    this._story = story;
    if (this.data && this.onSelectStory) {
      this.onSelectStory(this._story);
    }
  }
}
