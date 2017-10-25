import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { Sprint } from '../../../services/shared/projects/projects.service';

@Component({
  selector: 'app-sprint-modal',
  templateUrl: './sprint-modal.component.html',
  styleUrls: ['./sprint-modal.component.scss']
})
export class SprintModalComponent implements OnInit, AfterViewInit {
  private _sprint: Sprint;
  private _saveSprint: EventEmitter<any>;
  private _dates: Date[];
  @ViewChild('dataSprintModalClose') private btnClose: ElementRef;
  constructor() {
    this._sprint = new Sprint(undefined, 'Test');
    this._saveSprint = new EventEmitter<any>();
    this._dates = [new Date(), new Date()];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  doSaveSprint(sprint: Sprint) {
    sprint.start = this._dates[0];
    sprint.end = this._dates[1];
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
    this.dates = [new Date(this._sprint.start.valueOf()), new Date(this._sprint.end.valueOf())];
  }

  @Output() get saveSprint(): EventEmitter<any> {
    return this._saveSprint;
  }

  get dateConfig(): Partial<BsDatepickerConfig> {
    return {
      containerClass: 'theme-dark-blue'
    };
  }
 
  get dates(): Date[] {
    return this._dates;
  }
 
  set dates(dates: Date[]) {
    this._dates = dates;
  }
}
