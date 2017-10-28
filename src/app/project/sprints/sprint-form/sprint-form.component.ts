import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { Sprint } from '../../../services/shared/projects/projects.service';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.scss']
})
export class SprintFormComponent implements OnInit {
  private _sprintForm: FormGroup;
  private _dates: Date[];
  private _drp: any;
  constructor(private formBuilder: FormBuilder) {
    this._sprintForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      projectId: [],
      start: [],
      end: [],
      startEnd: ['']
    });
    this._dates = [new Date(), new Date()];
  }

  ngOnInit() {
  }

  saveSprint(sprint: Sprint) {
    sprint.start = this._dates[0];
    sprint.end = this._dates[1];
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

  get drp(): any {
    return this._drp;
  }
}
