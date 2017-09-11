import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService, UserStory, Sprint, Task } from '../../services/projects/projects.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  private _sprint: Sprint;
  private _data: any = {
    story: null
  };
  private _showCreateTask: Boolean = false;
  private _newTask: Task = new Task();
  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) {
    this.projectsService.getSprint(parseInt(this.route.snapshot.params.projectId || 0, 10),
      parseInt(this.route.snapshot.params.id || 0, 10))
    .then((sprint) => {
      this._sprint = sprint;
      if (this._sprint.userStories && this._sprint.userStories.length > 0) {
        this._data.story = this._sprint.userStories[0];
      }
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this._newTask.statusId = 0;
    this._newTask.points = 1;
  }

  onSelectStory (story) {
    this._data.story = story;
  }

  doNewTask () {
    this._showCreateTask = true;
  }

  doCreateTask (task) {
    this._newTask = new Task();
    this._newTask.statusId = 0;
    this._newTask.points = 1;
    if (this._data.story && this._data.story.tasks) {
      console.log(this._data);
      this._data.story.tasks.push(task);
    }
  }

  doCancelCreateTask () {
    this._showCreateTask = false;
  }

  get sprint (): Sprint {
    return this._sprint;
  }

  get data (): any {
    return this._data;
  }

  get showCreateTask (): Boolean {
    return this._showCreateTask;
  }

  get newTask (): Task {
    return this._newTask;
  }
}
