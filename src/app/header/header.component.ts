import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, UserLogged } from '../shared/classes/users.class';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _userLogged: UserLogged;
  constructor(private service: UsersService, private router: Router) {
    this._userLogged = service.userLogged;
  }

  ngOnInit() {
  }

  login() {
    this._userLogged = this.service.userLogged;
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/']);
    this._userLogged = null;
  }

  get userLogged(): UserLogged {
    return this._userLogged;
  }
}
