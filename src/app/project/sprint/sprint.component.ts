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
  private _story: UserStory;
  private _data: any = {
    addTask (task) {
      switch (task.statusId) {
        case 0:
          this.toDo.tasks.push(task);
          break;
        case 1:
          this.inProgress.tasks.push(task);
          break;
        case 2:
          this.testing.tasks.push(task);
          break;
        case 3:
          this.done.tasks.push(task);
          break;
        default: 
          this.toDo.tasks.push(task);
          break;
      }
    }
  };
  private _showCreateTask: Boolean = false;
  private _newTask: Task = new Task();
  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) {
    this.projectsService.getSprint(parseInt(this.route.snapshot.params.projectId || 0, 10),
      parseInt(this.route.snapshot.params.id || 0, 10))
    .then((sprint) => {
      this._sprint = sprint;
    }, err => {
      console.log(err);
    });
  }

  private cleanNewTask () {
    this._newTask = new Task();
    this._newTask.statusId = 0;
    this._newTask.points = 1;
    this._newTask.executedPoints = 0;
  }

  ngOnInit() {
    this.cleanNewTask();
  }

  doNewTask () {
    this._showCreateTask = true;
  }

  doCreateTask (task) {
    this.cleanNewTask();
    if (this.story && this.story.tasks) {
      this.story.tasks.push(task);
      this._data.addTask(task);
    }
  }

  doCancelCreateTask () {
    this._showCreateTask = false;
  }

  get sprint (): Sprint {
    return this._sprint;
  }

  get story (): UserStory {
    return this._story;
  }

  set story (value) {
    this._story = value;
  }

  get data (): any {
    return this._data;
  }

  set data (value) {
    this._data.toDo = value.toDo;
    this._data.inProgress = value.inProgress;
    this._data.testing = value.testing;
    this._data.done = value.done;
  }

  get showCreateTask (): Boolean {
    return this._showCreateTask;
  }

  get newTask (): Task {
    return this._newTask;
  }
}
