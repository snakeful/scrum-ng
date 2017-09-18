import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UsersService, Role, User } from '../../services/shared/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private _user: User;
  private _roles: Role[];
  private _tempUser: User = new User();
  @Output() private saveUser: EventEmitter<any> = new EventEmitter<any>();
  constructor(private usersService: UsersService) {
    usersService.getRoles().then(roles => {
      this._roles = roles;
    });
  }

  ngOnInit() {
  }

  public doSaveUser() {
    this.saveUser.emit(this.tempUser);
  }

  @Input() set user(value: User) {
    this._user = value;
    this._tempUser = Object.assign(new User(undefined, undefined, undefined, 0), value);
  }

  get roles(): Role[] {
    return this._roles;
  }

  get tempUser(): User {
    return this._tempUser;
  }
}
