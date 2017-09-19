import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Sprint } from '../../services/shared/projects.service';

@Component({
  selector: 'app-sprint-modal',
  templateUrl: './sprint-modal.component.html',
  styleUrls: ['./sprint-modal.component.css']
})
export class SprintModalComponent implements OnInit, AfterViewInit {
  private _id = 0;
  private _sprint: Sprint = new Sprint(++this._id, 'Test');
  private _saveSprint: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dataSprintModalClose') private btnClose: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  doSaveSprint(sprint) {
    this._saveSprint.emit({
      sprint: sprint,
      btnClose: this.btnClose
    });
    this._sprint = new Sprint(++this._id, 'Test');
  }

  get sprint(): Sprint {
    return this._sprint;
  }

  @Input() set sprint(value: Sprint) {
    this._sprint = value;
  }

  @Output() get saveSprint(): EventEmitter<any> {
    return this._saveSprint;
  }

}
