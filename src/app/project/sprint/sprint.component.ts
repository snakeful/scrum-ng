import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService, UserStory, Sprint, Task } from '../../services/projects/projects.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  private sprint: Sprint;
  private story: UserStory = new UserStory();
  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) {
    this.projectsService.getSprint(parseInt(this.route.snapshot.params.projectId || 0), parseInt(this.route.snapshot.params.id || 0))
    .then((sprint) => {
      this.sprint = sprint;
      if (this.sprint.userStories.length > 0) {
        this.story = this.sprint.userStories[0];
      }
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }
}
