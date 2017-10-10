import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { ProjectsService, Task, UserStory } from '../../../services/shared/projects/projects.service';

@Component({
  selector: 'app-sprint-tasks',
  templateUrl: './sprint-tasks.component.html',
  styleUrls: ['./sprint-tasks.component.css']
})
export class SprintTasksComponent implements OnInit {
  @Output() private onLoad: EventEmitter<any> = new EventEmitter<any>();
  private _toDo;
  private _inProgress;
  private _testing;
  private _done;
  private _tasks;
  private _selectedTask: Task;
  private userStory: UserStory;

  constructor(private service: ProjectsService, private alert: NotificationsService) { }

  private addTask(task: Task): Task {
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

  private removeTask(task: Task): Task {
    switch (task.statusId) {
      case 0:
        this._toDo.tasks.splice(this._toDo.tasks.indexOf(task), 1);
        break;
      case 1:
        this._inProgress.tasks.splice(this._inProgress.tasks.indexOf(task), 1);
        break;
      case 2:
        this._testing.tasks.splice(this._testing.tasks.indexOf(task), 1);
        break;
      case 3:
        this._done.tasks.splice(this._done.tasks.indexOf(task), 1);
        break;
      default:
        this._toDo.tasks.splice(this._toDo.tasks.indexOf(task), 1);
        break;
    }
    return task;
  }

  private onDropStatus(task: Task, statusId: number, updateTask?: Function) {
    const actualTask = Object.assign({}, this.removeTask(task));
    actualTask.statusId = statusId;
    if (statusId === 3 && updateTask) {
      updateTask(actualTask);
    }
    this.service.saveTask(actualTask)
    .subscribe(updated => {
      this.addTask(actualTask);
    }, err => {
      this.addTask(task);
      this.alert.error('User Stories Task', err, {
        timeOut: 10000
      });
    });
  }

  private onDropToDo = (task: Task) => {
    this.onDropStatus(task, 0);
  }

  private onDropInProgress = (task: Task) => {
    this.onDropStatus(task, 1);
  }

  private onDropTesting = (task: Task) => {
    this.onDropStatus(task, 2);
  }

  private onDropDone = (task: Task) => {
    this.onDropStatus(task, 3, taskToUpdate => {
      taskToUpdate.executedPoints = taskToUpdate.points;
    });
  }

  ngOnInit() {
    this._toDo = {
      title: 'To Do',
      scope: 'todo',
      dropScope: 'in-progress',
      color: 'badge-secondary',
      onDrop: this.onDropToDo,
      tasks: []
    };
    this._inProgress = {
      title: 'In Progress',
      scope: 'in-progress',
      dropScope: 'todo',
      color: 'badge-primary',
      onDrop: this.onDropInProgress,
      tasks: []
    };
    this._testing = {
      title: 'Testing',
      scope: 'testing',
      dropScope: 'in-progress',
      color: 'badge-info',
      onDrop: this.onDropTesting,
      tasks: []
    };
    this._done = {
      title: 'Done',
      scope: 'done',
      dropScope: ['todo', 'in-progress', 'testing'],
      color: 'badge-success',
      onDrop: this.onDropDone,
      tasks: []
    };
    this._tasks = [
      this._toDo,
      this._inProgress,
      this._testing,
      this._done
    ];
    this.onLoad.emit({
      toDo: this._toDo,
      inProgress: this._inProgress,
      testing: this._testing,
      done: this._done
    });
  }

  /* Properties */

  get tasks(): any[] {
    return this._tasks;
  }

  get selectedTask(): Task {
    return this._selectedTask;
  }

  set selectedTask(value) {
    this._selectedTask = value;
  }

  get actualStory(): UserStory {
    return this.userStory;
  }

  @Input() set actualStory(value: UserStory) {
    this.userStory = value;
  }
}
