import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationsService } from 'angular2-notifications';

import { ProjectsService, Task } from '../../../services/shared/projects/projects.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {
  private _taskForm: FormGroup;
  private _scrumTeam: number[];
  private _sendTask: EventEmitter<Task>;
  private statusId: number;
  private points: number;
  private executed: number;
  private _newTask: boolean;
  private _closeOnSaveTask: boolean;
  @ViewChild('dataTaskModalClose') private btnClose: ElementRef;
  constructor(private service: ProjectsService, private formBuilder: FormBuilder, private alert: NotificationsService) {
    this._taskForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      desc: [''],
      userStoryId: [0, [Validators.required]],
      statusId: [0],
      userId: [0, [Validators.required]],
      originId: [0],
      points: [0, [Validators.required, Validators.min(1)]],
      executedPoints: [0, [Validators.required]],
      successTask: [false]
    });
    this.statusId = 0;
    this.points = 1;
    this.executed = 0;
    this._scrumTeam = [];
    this._sendTask = new EventEmitter<Task>();
    this._closeOnSaveTask = true;
  }

  ngOnInit() {
  }

  saveTask(task) {
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
    this._taskForm.controls['points'].setValue(++this.points);
  }

  substractPoint() {
    if (this.points > (this.executed + 1)) {
      this._taskForm.controls['points'].setValue(--this.points);
    }
  }

  addExecutedPoint() {
    if (this.executed < (this.points - 1)) {
      this._taskForm.controls['executedPoints'].setValue(++this.executed);
    }
  }

  get taskForm(): FormGroup {
    return this._taskForm;
  }

  @Input() set task(value: Task) {
    this._newTask = value.id === undefined;
    this.statusId = value.statusId;
    this.points = value.points;
    this.executed = value.executedPoints;
    this._taskForm.patchValue(value);
    this._taskForm.updateValueAndValidity();
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

  get newTask(): boolean {
    return this._newTask;
  }

  get closeOnSaveTask(): boolean {
    return this._closeOnSaveTask;
  }

  set closeOnSaveTask(value: boolean) {
    this._closeOnSaveTask = value;
  }
}
