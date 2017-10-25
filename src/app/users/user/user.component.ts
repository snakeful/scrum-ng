import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UsersService, Role, User, UserLogged } from '../../services/shared/users/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private _userLogged: UserLogged
  private _user: User;
  private _roles: Role[];
  private _isAdmin: boolean;
  @Output() private saveUser: EventEmitter<any> = new EventEmitter<any>();
  constructor(private service: UsersService) {
    this._user = new User();
    this._userLogged = service.userLogged;
    service.getRoles()
      .subscribe(roles => {
        this._roles = roles;
      });
  }

  ngOnInit() {
  }

  get userLogged(): UserLogged {
    return this._userLogged;
  }

  get user(): User {
    return this._user;
  }

  @Input() set user(value: User) {
    if (!value) {
      this._user = new User();
    } else {
      this._user = value;
    }
    this._isAdmin = this._user.admin;
  }

  get roles(): Role[] {
    return this._roles;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }
}
