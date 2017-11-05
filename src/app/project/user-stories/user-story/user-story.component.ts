import { Component, OnInit, Input } from '@angular/core';

import { UserStory, StoryPriority } from '../../../shared/classes/projects.class';
import { ProjectsService } from '../../../shared/services/projects.service';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.scss']
})
export class UserStoryComponent implements OnInit {
  private _userStory: UserStory = new UserStory();
  private _priorities: StoryPriority[];
  constructor(private service: ProjectsService) {
    service.priorities.then(priorities => {
      this._priorities = priorities;
    });
  }

  ngOnInit() {
  }

  get userStory(): UserStory {
    return this._userStory;
  }

  @Input() set userStory(value: UserStory) {
    this._userStory = value;
  }

  get priorities(): StoryPriority[] {
    return this._priorities;
  }
}
