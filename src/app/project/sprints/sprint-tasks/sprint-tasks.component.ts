import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { cloneDeep } from 'lodash';
import { NotificationsService } from 'angular2-notifications';

import { Task, UserStory } from '../../../shared/classes/projects.class';
import { ProjectsService } from '../../../shared/services/projects.service';

@Component({
  selector: 'scrum-sprint-tasks',
  templateUrl: './sprint-tasks.component.html',
  styleUrls: ['./sprint-tasks.component.scss']
})
export class SprintTasksComponent implements OnInit {
  private _toDo;
  private _inProgress;
  private _testing;
  private _done;
  private _tasks;
  private _selectedTask: Task;
  private _userStory: UserStory;
  private _onLoad: EventEmitter<any>;
  private _onSelect: EventEmitter<Task>;
  constructor(private service: ProjectsService, private alert: NotificationsService) {
    this._onLoad = new EventEmitter<any>();
    this._onSelect = new EventEmitter<Task>();
  }

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
    this.removeTask(task);
    const actualTask = cloneDeep(task);
    actualTask.statusId = statusId;
    if (statusId === 3 && updateTask) {
      updateTask(actualTask);
    }
    this.service.saveTask(actualTask)
      .subscribe(() => {
        task.statusId = statusId;
        this.addTask(task);
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
    this._onLoad.emit({
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

  set selectedTask(value: Task) {
    this._onSelect.emit(value);
    this._selectedTask = value;
  }

  get userStory(): UserStory {
    return this._userStory;
  }

  @Input() set userStory(value: UserStory) {
    this._userStory = value;
  }

  @Output() get onLoad(): EventEmitter<any> {
    return this._onLoad;
  }

  @Output() get onSelect(): EventEmitter<Task> {
    return this._onSelect;
  }
}
