import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { UsersService, User } from '../../services/shared/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  private _users: User[];
  private _selected: User;
  @ViewChild('dataUserClose') private btnClose: ElementRef;
  constructor(private usersService: UsersService) {
    usersService.getScrumTeamUsers().then(users => {
      this._users = users;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  get users(): User[] {
    return this._users;
  }

  set add(user: User) {
    user.id = this._users.length;
    this._users.push(user);
    this.btnClose.nativeElement.click();
  }

  set update(user: User) {

    Object.assign(this._selected, user);
    this.btnClose.nativeElement.click();
  }

  get selected(): User{
    return this._selected;
  }

  set selected(value: User) {
    this._selected = value;
  }
}
