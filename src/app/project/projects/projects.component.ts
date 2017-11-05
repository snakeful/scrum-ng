import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { cloneDeep, isNil } from 'lodash';

import { User, UserLogged } from '../../shared/classes/users.class';
import { UsersService } from '../../shared/services/users.service';
import { Project } from '../../shared/classes/projects.class';
import { ProjectsService } from '../../shared/services/projects.service';

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
  constructor(private service: ProjectsService, private usersService: UsersService, private alert: NotificationsService) {
    this._board = [{
      id: 0,
      title: 'New',
      color: 'bg-light',
      scope: 'new',
      dropScope: 'in-progress',
      projects: [],
      onDrop: onDrop
    }, {
      id: 1,
      title: 'In Progress',
      color: 'bg-primary',
      scope: 'in-progress',
      dropScope: 'new',
      projects: [],
      onDrop: onDrop
    }, {
      id: 2,
      title: 'Done',
      color: 'bg-success',
      scope: 'done',
      dropScope: 'in-progress',
      projects: [],
      onDrop: onDrop
    }];
    const board = this._board;
    function onDrop(project: Project) {
      const update = cloneDeep(project);
      update.statusId = this.id;
      service.saveProject(update)
        .subscribe(updated => {
          const projects = board[project.statusId].projects;
          projects.splice(projects.indexOf(project), 1);
          project.statusId = this.id;
          this.projects.push(project);
        }, err => this.alert.html(err, 'error', {
          timeOut: 10000
        }));
    }
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

  ngAfterViewInit() { }

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

  get user(): UserLogged {
    return this.usersService.userLogged;
  }
}
