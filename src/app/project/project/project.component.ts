import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project;
  constructor(private service: ProjectsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.project = this.service.getProject(parseInt(this.route.snapshot.params.id || 0));
  }

}
