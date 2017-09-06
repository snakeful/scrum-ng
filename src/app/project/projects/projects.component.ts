import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects;
  constructor(private projectsService: ProjectsService) {
    this.projects = projectsService.getProjects();
    console.log(this.projects);
  }

  ngOnInit() {
  }

}
