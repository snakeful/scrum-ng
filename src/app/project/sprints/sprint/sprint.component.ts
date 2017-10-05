import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectsService, UserStory, Sprint, Task } from '../../../services/shared/projects/projects.service';
declare let $: any;

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  private _sprint: Sprint = new Sprint();
  private _story: UserStory;
  private _toDo: any;
  private _inProgress: any;
  private _testing: any;
  private _done: any;
  private _showCreateTask: Boolean = false;
  private _newTask: Task = new Task();

  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) { }

  private addTask(task) {
    switch (task.statusId) {
      case 0:
        this._toDo.tasks.push(task);
        break;
      case 1:
        this._inProgress.tasks.push(task);
        break;
      case 2:
        this._testing.tasks.push(task);
        break;
      case 3:
        this._done.tasks.push(task);
        break;
      default:
        this._toDo.tasks.push(task);
        break;
    }
    return task;
  }

  private cleanNewTask() {
    this._newTask = new Task();
    this._newTask.statusId = 0;
    this._newTask.points = 1;
    this._newTask.executedPoints = 0;
  }

  ngOnInit() {
    this.projectsService.getSprint(parseInt(this.route.snapshot.params.projectId || 0, 10),
      parseInt(this.route.snapshot.params.id || 0, 10))
      .subscribe((sprint) => {
        this._sprint = sprint;
      });
    this.cleanNewTask();
  }

  doNewTask() {
    this._showCreateTask = true;
  }

  doCreateTask(task: Task) {
    this.cleanNewTask();
    if (this.story && this.story.tasks) {
      this.story.tasks.push(task);
      this.addTask(task);
    }
    $('#taskName').focus();
  }

  doCancelCreateTask() {
    this._showCreateTask = false;
  }

  /* Properties */

  get sprint(): Sprint {
    return this._sprint;
  }

  get story(): UserStory {
    return this._story;
  }

  set story(value) {
    this._story = value;
  }

  set tasks(value) {
    this._toDo = value.toDo;
    this._inProgress = value.inProgress;
    this._testing = value.testing;
    this._done = value.done;
    if (this.sprint.userStories) {
      this.sprint.userStories.forEach((story) => {
        story.tasks.forEach((task) => {
          this.addTask(task);
        });
      });
    }
  }

  get showCreateTask(): Boolean {
    return this._showCreateTask;
  }

  get newTask(): Task {
    return this._newTask;
  }
}