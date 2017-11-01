import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { cloneDeep, isNil } from 'lodash';

import { UsersService, User } from '../../services/shared/users/users.service';
import { ProjectsService, Project } from '../../services/shared/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  private _board: any[];
  private _projects: Project[];
  private _selected: Project = new Project();
  @ViewChild('dataProjectClose') private btnClose: ElementRef;
  constructor(private service: ProjectsService, private alert: NotificationsService) {
    this._board = [{
      title: 'New',
      color: 'badge-warning',
      scope: 'new',
      dropScope: 'in-progress',
      projects: []
    }, {
      title: 'In Progress',
      color: 'badge-primary',
      scope: 'in-progress',
      dropScope: 'new',
      projects: []
    }, {
      title: 'Done',
      color: 'badge-success',
      scope: 'done',
      dropScope: 'in-progress',
      projects: []
    }];
  }

  ngOnInit() {
    this.service.projects.subscribe(projects => {
      this._projects = projects;
      this._projects.forEach(project => {
        this._board[project.statusId].projects.push(project);
      });
    }, err => this.alert.html(err, 'error', {
      timeOut: 10000
    }));
  }

  ngAfterViewInit() {}

  get board(): any[] {
    return this._board;
  }

  get projects(): Project[] {
    return this._projects;
  }

  get selected(): Project {
    return this._selected;
  }

  set selected(value: Project) {
    this._selected = value;
  }

  set updateProject(value: Project) {
    if (isNil(this._selected)) {
      this._projects.push(value);
    } else {
      this._projects[this._projects.indexOf(this._selected)] = value;
    }
    this.btnClose.nativeElement.click();
  }
}
