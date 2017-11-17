import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserLogged } from '../../shared/classes/users.class';
import { UsersService } from '../../shared/services/users.service';
import { Project } from '../../shared/classes/projects.class';

@Component({
  selector: 'scrum-project-modal',
  templateUrl: './project-modal.component.html'
})
export class ProjectModalComponent implements OnInit {

  constructor(private service: UsersService, private modal: NgbActiveModal) { }

  ngOnInit() {
  }

  close() {
    this.modal.close();
  }

  get user(): UserLogged {
    return this.service.userLogged;
  }

  @Input() set updateProject(value: Project) {
    this.modal.close(value);
  }
}
