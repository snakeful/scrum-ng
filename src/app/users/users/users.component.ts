import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { isNil } from 'lodash';

import { User, UserLogged } from '../../shared/classes/users.class';
import { UsersService } from '../../shared/services/users.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'scrum-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private _users: User[];
  private _selected: User;
  private modal: NgbModalRef;
  constructor(private service: UsersService, private modalService: NgbModal, private alert: NotificationsService) {
  }

  ngOnInit() {
    this.service.getUsers()
      .subscribe(users => this._users = users,
      err => this.alert.html(err, 'error', {
        timeOut: 10000
      }));
  }

  get users(): User[] {
    return this._users;
  }

  set add(user: User) {
    user.id = this._users.length;
    this._users.push(user);
    this._selected = user;
  }

  set update(user: User) {
    Object.assign(this._selected, user);
    this._selected = new User();
  }

  get selected(): User {
    return this._selected;
  }

  set selected(value: User) {
    this._selected = value;
    this.modal = this.modalService.open(UserModalComponent, {
      container: 'nb-layout'
    });
    this.modal.componentInstance.user = this._selected;
    this.modal.result.then((data: User) => {
      if (data) {
        if (isNil(this._selected)) {
          this.add = data;
        } else {
          this.update = data;
        }
      }
    });
  }

  get user(): UserLogged {
    return this.service.userLogged;
  }
}
