import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserLogged } from '../../../shared/classes/users.class';
import { UsersService } from '../../../shared/services/users.service';
import { Task } from '../../../shared/classes/projects.class';

@Component({
  selector: 'scrum-task-modal',
  templateUrl: './task-modal.component.html'
})
export class TaskModalComponent implements OnInit {

  constructor(private service: UsersService, private modal: NgbActiveModal) { }

  ngOnInit() {
  }

  close() {
    this.modal.close();
  }

  get user(): UserLogged {
    return this.service.userLogged;
  }

  @Input() set updateTask(value: Task) {
    this.modal.close(value);
  }
}
