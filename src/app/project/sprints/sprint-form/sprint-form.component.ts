import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NotificationsService } from 'angular2-notifications';
import { isNil } from 'lodash';

import { UserLogged } from '../../../shared/classes/users.class';
import { UsersService } from '../../../shared/services/users.service';
import { Sprint } from '../../../shared/classes/projects.class';
import { ProjectsService } from '../../../shared/services/projects.service';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.scss']
})
export class SprintFormComponent implements OnInit {
  private _sprintForm: FormGroup;
  private _dates: Date[];
  private _drp: any;
  private _onSaveSprint: EventEmitter<Sprint>;
  constructor(private service: ProjectsService, private usersService: UsersService, private formBuilder: FormBuilder,
    private alert: NotificationsService) {
    this._sprintForm = this.formBuilder.group({
      id: [null],
      name: [{
        value: '',
        disabled: !(this.user.admin || this.user.scrumMaster)
      }, [Validators.required]],
      projectId: [0],
      start: [],
      end: [],
      startEnd: ['']
    });
    this._dates = [new Date(), new Date()];
    this._onSaveSprint = new EventEmitter<Sprint>();
  }

  ngOnInit() {
  }

  saveSprint(sprint: Sprint) {
    sprint.start = this._dates[0];
    sprint.end = this._dates[1];
    this.service.saveSprint(sprint)
      .subscribe(obj => {
        this._onSaveSprint.emit(obj);
        this.alert.success(`Sprint ${sprint.name}`, 'Sprint saved.', {
          timeOut: 2000,
          showProgressBar: false
        });
      }, err => this.alert.html(err, 'error', {
        timeOut: 10000
      }));
  }

  get sprintForm(): FormGroup {
    return this._sprintForm;
  }

  @Input() set sprint(value: Sprint) {
    this._sprintForm.patchValue(value || new Sprint());
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

  @Output() get onSaveSprint(): EventEmitter<Sprint> {
    return this._onSaveSprint;
  }

  get user(): UserLogged {
    return this.usersService.userLogged;
  }
}
