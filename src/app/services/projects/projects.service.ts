import { Injectable } from '@angular/core';

@Injectable()
export class ProjectsService {
  private projects = [{
    id: 1,
    name: 'Project 1',
    desc: 'This is a project template'
  }, {
    id: 2,
    name: 'Project 2',
    desc: 'This is a project template'
  }, {
    id: 3,
    name: 'Project 3',
    desc: 'This is a project template'
  }];
  constructor() { }

  getProjects () {
    return new Promise((resolve, reject) => {
      resolve(this.projects);
    });
  }

  getProject (id: Number) {
    let project;
    return new Promise((resolve, reject) => {
      this.projects.forEach((prj) => {
        if (id === prj.id) {
          project = prj;
        }
      });
      project ? resolve(project) : reject('Record not found');
    });
  }
}
