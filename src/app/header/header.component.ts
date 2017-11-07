import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { User, UserLogged } from '../shared/classes/users.class';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  private _userLogged: UserLogged;
  @ViewChild('btnLogin') private btnLogin: ElementRef;
  constructor(private service: UsersService, private router: Router) {
    this._userLogged = service.userLogged;
  }

  ngOnInit() { }

  ngAfterViewInit() { }

  login() {
    this._userLogged = this.service.userLogged;
  }

  showLogin() {
    this.btnLogin.nativeElement.click();
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/']);
    this._userLogged = null;
  }

  onMenuItemClick(item) {
    console.log(item);
    item.click && this[item.click]();
  }

  get user(): UserLogged {
    return this._userLogged;
  }

  get userMenu(): any[] {
    if (!this.user) {
      return [{
        title: 'Login',
        click: 'showLogin'
      }];
    }
    return [{
      title: 'Profile'
    }, {
      title: 'Log Out',
      click: 'logout'
    }]
  }
}
