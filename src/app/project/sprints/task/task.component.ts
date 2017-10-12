import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../../../services/shared/projects/projects.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  private _task: Task;
  constructor() { }

  ngOnInit() {
  }

  addExecutedPoints(task) {
    if (task.points > task.executedPoints) {
      if (task.statusId !== 3) {
        task.executedPoints++;
      }
    }
  }

  substractExecutedPoints(task) {
    if (task.executedPoints > 0) {
      task.executedPoints--;
    }
  }

  get task(): Task {
    return this._task;
  }

  @Input() set task(value: Task) {
    this._task = value;
  }
}