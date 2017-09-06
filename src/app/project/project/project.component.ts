import { Component, OnInit } from '@angular/core';

import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project;
  service: ProjectsService;
  constructor(private projectsService: ProjectsService) {
    this.service = projectsService;
  }

  ngOnInit() {
    this.project = this.service.getProject(1);
  }

}
