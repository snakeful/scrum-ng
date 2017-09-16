import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UsersService, User } from '../../services/shared/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private _users: User[];
  private _selected: User;
  @ViewChild('data-user-close') private btnClose: ElementRef;
  constructor(private usersService: UsersService) {
    usersService.getScrumTeamUsers().then(users => {
      this._users = users;
    });
  }

  ngOnInit() {
  }

  get users(): User[] {
    return this._users;
  }
  
  set add(user: User) {
    this.btnClose.nativeElement.click();
  }

  get selected(): User{
    return this._selected;
  }

  set selected(value: User) {
    console.log(value);
    this._selected = value;
  }
}
