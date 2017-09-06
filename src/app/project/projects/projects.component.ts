import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
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

  ngOnInit() {
  }

}
