import { Component, OnInit } from '@angular/core';

import { UsersService, UserLogged } from '../services/shared/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _userLogged: UserLogged;
  constructor(private service: UsersService) {
    this._userLogged = service.userLogged;
  }

  ngOnInit() {
  }

  login() {
    this._userLogged = this.service.userLogged;
  }

  logout() {
    this.service.logout();
    this._userLogged = null;
  }

  get userLogged(): UserLogged {
    return this._userLogged;
  }
}
