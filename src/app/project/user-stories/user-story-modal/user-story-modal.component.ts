import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserLogged } from '../../../shared/classes/users.class';
import { UsersService } from '../../../shared/services/users.service';
import { UserStory } from '../../../shared/classes/projects.class';

@Component({
  selector: 'scrum-user-story-modal',
  templateUrl: './user-story-modal.component.html'
})
export class UserStoryModalComponent implements OnInit {

    constructor(private service: UsersService, private modal: NgbActiveModal) { }

    ngOnInit() {
    }

    close() {
      this.modal.close();
    }

    get user(): UserLogged {
      return this.service.userLogged;
    }

    @Input() set saveUserStory(value: UserStory) {
      this.modal.close(value);
    }

}
