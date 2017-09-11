import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../services/projects/projects.service';

@Component({
  selector: 'app-sprint-tasks',
  templateUrl: './sprint-tasks.component.html',
  styleUrls: ['./sprint-tasks.component.css']
})
export class SprintTasksComponent implements OnInit {
  @Output() onLoad: EventEmitter<any> = new EventEmitter<any>();
  private _toDo: any = {
    title: 'To Do',
    scope: 'todo',
    dropScope: 'inprogress',
    tasks: new Array<Task>()
  };
  private _inProgress: any = {
    title: 'In Progress',
    scope: 'in-progress',
    dropScope: 'todo',
    tasks: new Array<Task>()
  };
  private _testing: any = {
    title: 'Testing',
    scope: 'testing',
    dropScope: 'inprogress',
    tasks: new Array<Task>()
  };
  private _done: any = {
    title: 'Done',
    scope: 'done',
    dropScope: ['todo', 'inprogress', 'testing'],
    tasks: new Array<Task>()
  };
  private _tasks: any[] = [
    this._toDo,
    this._inProgress,
    this._testing,
    this._done
  ];
  constructor() { }

  ngOnInit() {
    this.onLoad.emit({
      toDo: this._toDo,
      inProgress: this._inProgress,
      testing: this._testing,
      done: this._done
    });
  }

  get tasks (): any[] {
    return this._tasks;
  }
}
