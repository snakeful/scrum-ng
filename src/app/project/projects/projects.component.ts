import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '../../services/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  private _projects: Project[];
  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit() {
    this.projectsService.getProjects()
    .then((projects) => {
      this._projects = projects;
    });
  }

  get projects (): Project[] {
    return this._projects;
  }

  set projects (value: Project[]) {
    this._projects = value;
  }
}
