import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    this._onSaveSprint = new EventEmitter<Sprint>();
  }

  ngOnInit() {
  }

  saveSprint(sprint: Sprint) {
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
    if (value) {
      this._sprintForm.patchValue({
        'start': value.start.toISOString().substring(0, 10)
      });
      this._sprintForm.patchValue({
        'end': value.end.toISOString().substring(0, 10)
      });
    }
  }

  @Output() get onSaveSprint(): EventEmitter<Sprint> {
    return this._onSaveSprint;
  }

  get user(): UserLogged {
    return this.usersService.userLogged;
  }
}
