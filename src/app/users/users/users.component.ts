import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { User, UserLogged } from '../../shared/classes/users.class';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  private _users: User[];
  private _selected: User;
  @ViewChild('dataUserClose') private btnClose: ElementRef;
  constructor(private service: UsersService, private alert: NotificationsService) {
  }

  ngOnInit() {
    this.service.getUsers()
      .subscribe(users => this._users = users,
      err => this.alert.html(err, 'error', {
        timeOut: 10000
      }));
  }

  ngAfterViewInit() {
  }

  get users(): User[] {
    return this._users;
  }

  set add(user: any) {
    user.user.id = this._users.length;
    this._users.push(user.user);
    this._selected = user.user;
    user.btnClose.nativeElement.click();
  }

  set update(user: any) {
    Object.assign(this._selected, user.user);
    user.btnClose.nativeElement.click();
    this._selected = new User();
  }

  get selected(): User {
    return this._selected;
  }

  set selected(value: User) {
    this._selected = value;
  }

  get user(): UserLogged {
    return this.service.userLogged;
  }
}
