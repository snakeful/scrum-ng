import { Component, OnInit, Input } from '@angular/core';
import { Project, UserStory } from '../../services/projects/projects.service';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {
  @Input() object: any;
  @Input() onSelectStory: Function;
  private userStory: UserStory;
  constructor() { }

  ngOnInit() {
  }

  selectStory (story) {
    this.userStory = story;
    if (this.onSelectStory) {
      this.onSelectStory(story);
    }
  }
}
