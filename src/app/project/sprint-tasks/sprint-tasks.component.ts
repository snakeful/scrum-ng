import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../services/projects/projects.service';

@Component({
  selector: 'app-sprint-tasks',
  templateUrl: './sprint-tasks.component.html',
  styleUrls: ['./sprint-tasks.component.css']
})
export class SprintTasksComponent implements OnInit {
  @Output() onLoad: EventEmitter<any> = new EventEmitter<any>();
  private _toDo;
  private _inProgress;
  private _testing;
  private _done;
  private _tasks;

  constructor() { };

  private addTask (task: Task): Task {
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
  };

  private removeTask (task: Task): Task {
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
  };
  
  private onDropToDo = (task: Task) => {
    this.removeTask(task).statusId = 0;
    this.addTask(task);
  };
  
  private onDropInProgress = (task: Task) => {
    this.removeTask(task).statusId = 1;
    this.addTask(task);
  };

  private onDropTesting = (task: Task) => {
    this.removeTask(task).statusId = 2;
    this.addTask(task);
  };
  
  private onDropDone = (task: Task) => {
    this.removeTask(task).statusId = 3;
    this.addTask(task);
  };

  ngOnInit() {
    this._toDo = {
      title: 'To Do',
      scope: 'todo',
      dropScope: 'in-progress',
      onDrop: this.onDropToDo,
      tasks: new Array<Task>()
    };
    this._inProgress = {
      title: 'In Progress',
      scope: 'in-progress',
      dropScope: 'todo',
      onDrop: this.onDropInProgress,
      tasks: new Array<Task>()
    };
    this._testing = {
      title: 'Testing',
      scope: 'testing',
      dropScope: 'in-progress',
      onDrop: this.onDropTesting,
      tasks: new Array<Task>()
    };
    this._done = {
      title: 'Done',
      scope: 'done',
      dropScope: ['todo', 'in-progress', 'testing'],
      onDrop: this.onDropDone,
      tasks: new Array<Task>()
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
  };

  /* Properties */

  get tasks (): any[] {
    return this._tasks;
  };
}
