import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserLogged } from '../../../shared/classes/users.class';
import { UsersService } from '../../../shared/services/users.service';
import { Sprint } from '../../../shared/classes/projects.class';

@Component({
  selector: 'scrum-sprint-modal',
  templateUrl: './sprint-modal.component.html'
})
export class SprintModalComponent implements OnInit {

  constructor(private service: UsersService, private modal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.modal.close();
  }

  get user(): UserLogged {
    return this.service.userLogged;
  }

  @Input() set saveSprint(value: Sprint) {
    this.modal.close(value);
  }

}
