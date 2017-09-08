import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators }  from '@angular/forms';
import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  private sprint;
  form: FormGroup;
  post: any;
  name: String;
  description: String;
  priorityId: Number;
  statusId: Number;
  constructor(private projectsService: ProjectsService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.projectsService.getSprint(parseInt(this.route.snapshot.params.projectId || 0), parseInt(this.route.snapshot.params.id || 0))
    .then((sprint) => {
      this.sprint = sprint;
    }, err => {
      console.log(err);
    });
    this.form = formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(100)])]
    });
  }

  ngOnInit() {
  }
}
