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
  private data: any = {
    story: null
  };
  private showCreateTask: Boolean = false;
  private newTask: Task = new Task();
  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) {
    this.projectsService.getSprint(parseInt(this.route.snapshot.params.projectId || 0), parseInt(this.route.snapshot.params.id || 0))
    .then((sprint) => {
      this.sprint = sprint;
      if (this.sprint.userStories && this.sprint.userStories.length > 0) {
        this.data.story = this.sprint.userStories[0];
      }
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.newTask.statusId = 0;
    this.newTask.points = 1;
  }

  onSelectStory (story) {
    this.data.story = story;
  }

  doNewTask () {
    this.showCreateTask = true;
  }

  doCreateTask (task) {
    this.newTask = new Task();
    this.newTask.statusId = 0;
    this.newTask.points = 1;
    if (this.data.story && this.data.story.tasks) {
      console.log(this.data);
      this.data.story.tasks.push(task);
    }
  }

  doCancelCreateTask () {
    this.showCreateTask = false;
  }
}
