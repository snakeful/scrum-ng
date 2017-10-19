import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { ProjectsService, Task } from '../../../services/shared/projects/projects.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {
  private _task: Task;
  private _scrumTeam: number[];
  private _sendTask: EventEmitter<Task>;
  private _closeOnSaveTask: Boolean;
  private _newTask: Boolean;
  @ViewChild('dataTaskModalClose') private btnClose: ElementRef;
  constructor(private service: ProjectsService, private alert: NotificationsService) {
    this._task = new Task();
    this._scrumTeam = [];
    this._sendTask = new EventEmitter<Task>();
    this._closeOnSaveTask = true;
  }

  ngOnInit() {
  }

  get task(): Task {
    return this._task;
  }

  saveTask(task: Task) {
    this.service.saveTask(task)
      .subscribe(updated => {
        this.sendTask.emit(task);
        this.alert.success('Task', 'Task saved.', {
          timeOut: 2000
        });
        if (this._newTask) {
          this.task = new Task(undefined, null, null, task.userStoryId, 1, 0, 0, false);
        }
        if (this._closeOnSaveTask) {
          this.btnClose.nativeElement.click();
        }
      }, err => {
        this.alert.error('Tasks', err, {
          timeOut: 10000
        });
      });
  }

  addPoint() {
    this._task.points++;
  }

  substractPoint() {
    if (this._task.points > (this._task.executedPoints + 1)) {
      this._task.points--;
    }
  }

  addExecutedPoint() {
    if (this._task.executedPoints < (this._task.points - 1)) {
      this._task.executedPoints++;
    }
  }

  @Input() set task(value: Task) {
    this._newTask = value.id === undefined;
    this._task = value;
  }

  get scrumTeam(): number[] {
    return this._scrumTeam;
  }

  @Input() set scrumTeam(value: number[]) {
    this._scrumTeam = value;
  }

  @Output() get sendTask(): EventEmitter<Task> {
    return this._sendTask;
  }

  get closeOnSaveTask(): Boolean {
    return this._closeOnSaveTask;
  }

  set closeOnSaveTask(value: Boolean) {
    this._closeOnSaveTask = value;
  }

  get newTask(): Boolean {
    return this._newTask;
  }
}
