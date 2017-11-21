import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ng2-webstorage';
import { isNil } from 'lodash';

import { UserLogged } from '../shared/classes/users.class';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'scrum-server-modal',
  templateUrl: './server-modal.component.html'
})
export class ServerModalComponent implements OnInit {
  private serverStorage = 'server';
  private server: string;
  constructor(private service: UsersService, private modal: NgbActiveModal, private storage: LocalStorageService) { }

  ngOnInit() {
    this.server = this.storage.retrieve(this.serverStorage);
    if (isNil(this.server)) {
      this.server = 'http://localhost:4201';
    }
  }

  close() {
    this.modal.close();
  }

  saveServer() {
    this.storage.store(this.serverStorage, this.server);
    this.close();
  }

  get userLogged(): UserLogged {
    return this.service.userLogged;
  }

}
