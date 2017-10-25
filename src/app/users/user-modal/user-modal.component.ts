import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { cloneDeep, isNil } from 'lodash';
import { UsersService, Role, User, UserLogged } from '../../services/shared/users/users.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit, AfterViewInit {
  private _userLogged: UserLogged;
  private _roles: Role[];
  private _user: User = new User();
  @Output() private saveUser: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dataUserClose') btnClose: ElementRef;
  constructor(private service: UsersService, private alert: NotificationsService) {
    this._userLogged = service.userLogged;
    service.getRoles()
      .subscribe(roles => {
        this._roles = roles;
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  doSaveUser(user: User) {
    console.log(user);
    if (!isNil(user.password) || !isNil(user.confirm)) {
      if (user.password !== user.confirm) {
        this.alert.warn('Password and confirm must be the same.')
        return;
      }
    }
    const newUser: Boolean = isNil(user.id);
    (newUser ? this.service.createUser(user) : this.service.saveUser(user.id, user))
    .subscribe(updatedUser => {
      updatedUser.password = null;
      updatedUser.confirm = null;
      this.alert.success(`User ${updatedUser.user}`, `User ${newUser ? 'created' : 'saved'}.`, {
        timeOut: 2000,
        showProgressBar: false
      });
      this.saveUser.emit({
        user: updatedUser,
        btnClose: this.btnClose
      });
    });
  }

  get userLogged(): UserLogged {
    return this._userLogged;
  }

  get roles(): Role[] {
    return this._roles;
  }

  get user(): User {
    return this._user;
  }

  @Input() set user(value: User) {
    if (!value) {
      this._user = new User();
    } else {
      this._user = cloneDeep(value);
    }
  }

}
