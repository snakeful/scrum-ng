import { Component, OnInit, Input } from '@angular/core';

import { UserStory, StoryPriority, ProjectsService } from '../../services/shared/projects/projects.service';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {
  private _userStory: UserStory = new UserStory();
  private _priorities: StoryPriority[];
  constructor(private projectsService: ProjectsService) {
    projectsService.getPriorities().then(priorities => {
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
