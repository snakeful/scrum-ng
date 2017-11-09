import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { isNil } from 'lodash';
import { NotificationsService } from 'angular2-notifications';

import { Task } from '../../../shared/classes/projects.class';
import { ProjectsService } from '../../../shared/services/projects.service';

@Component({
  selector: 'scrum-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  private _taskForm: FormGroup;
  private _scrumTeam: number[];
  private _onSaveTask: EventEmitter<Task>;
  private statusId: number;
  private points: number;
  private executed: number;
  private minExecuted: number;
  private _newTask: boolean;
  constructor(private service: ProjectsService, private formBuilder: FormBuilder, private alert: NotificationsService) {
    this._taskForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      desc: [''],
      userStoryId: [0, [Validators.required]],
      statusId: [0],
      userId: [0, [Validators.required]],
      originId: [0],
      points: [0, [Validators.min(1)]],
      executedPoints: [0],
      successTask: [false]
    });
    this.statusId = 0;
    this.points = 1;
    this.executed = 0;
    this._scrumTeam = [];
    this._onSaveTask = new EventEmitter<Task>();
  }

  ngOnInit() {
  }

  saveTask(task) {
    this.service.saveTask(task)
      .subscribe(updated => {
        this.onSaveTask.emit(task);
        this.alert.success('Task', 'Task saved.', {
          timeOut: 2000
        });
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

  substractExecutedPoint() {
    if (this.minExecuted < this.executed) {
      this._taskForm.controls['executedPoints'].setValue(--this.executed);
    }
  }

  get taskForm(): FormGroup {
    return this._taskForm;
  }

  @Input() set task(value: Task) {
    value = value || new Task();
    this._taskForm.patchValue(value);
    this._newTask = isNil(value.id);
    this.statusId = value.statusId;
    this.points = value.points;
    this.executed = value.executedPoints;
    this.minExecuted = value.executedPoints;
  }

  get scrumTeam(): number[] {
    return this._scrumTeam;
  }

  @Input() set scrumTeam(value: number[]) {
    this._scrumTeam = value;
  }

  @Output() get onSaveTask(): EventEmitter<Task> {
    return this._onSaveTask;
  }

  get newTask(): boolean {
    return this._newTask;
  }
}
