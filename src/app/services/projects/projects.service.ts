import { Injectable } from '@angular/core';

@Injectable()
export class ProjectsService {
  projects = [{
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
    return this.projects;
  }
  getProject (id: Number) {
    let project;
    this.projects.forEach((prj) => {
      if (id === prj.id) {
        project = prj;
      }
    });
    return project;
  }
}
