import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Sprint } from '../../../services/shared/projects/projects.service';

@Component({
  selector: 'app-sprint-modal',
  templateUrl: './sprint-modal.component.html',
  styleUrls: ['./sprint-modal.component.css']
})
export class SprintModalComponent implements OnInit, AfterViewInit {
  private _sprint: Sprint;
  private _saveSprint: EventEmitter<any>;
  @ViewChild('dataSprintModalClose') private btnClose: ElementRef;
  constructor() {
    this._sprint = new Sprint(undefined, 'Test');
    this._saveSprint = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  doSaveSprint(sprint: Sprint) {
    this._saveSprint.emit({
      sprint: sprint,
      btnClose: this.btnClose
    });
  }

  get sprint(): Sprint {
    return this._sprint;
  }

  @Input() set sprint(value: Sprint) {
    if (value) {
      Object.assign(this._sprint, value);
    } else {
      this._sprint = new Sprint();
      this._sprint.start = new Date();
      this._sprint.end = new Date();
    }
  }

  @Output() get saveSprint(): EventEmitter<any> {
    return this._saveSprint;
  }
}
