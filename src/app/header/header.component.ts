import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { isNil } from 'lodash';

import { User, UserLogged } from '../shared/classes/users.class';
import { UsersService } from '../shared/services/users.service';
import { LoginModalComponent } from '../users/login-modal/login-modal.component';
import { ServerModalComponent } from '../server-modal/server-modal.component';

@Component({
  selector: 'scrum-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _userLogged: UserLogged;
  private modal: NgbModalRef;
  constructor(private service: UsersService, private modalService: NgbModal, private router: Router) {
    this._userLogged = service.userLogged;
  }

  ngOnInit() { }

  login() {
    this.modal = this.modalService.open(LoginModalComponent, {
      container: 'nb-layout'
    });
    this.modal.result.then((data: boolean) => {
      this._userLogged = this.service.userLogged;
      this.service.setUserPrivileges();
    });
  }

  showServer() {
    this.modal = this.modalService.open(ServerModalComponent, {
      size: 'sm',
      container: 'nb-layout'
    });
    this.modal.result.then(() => {}).catch(() => {});
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/']);
    this._userLogged = null;
  }

  onMenuItemClick(item) {
    if (!isNil(item.click)) {
      this[item.click]();
    }
  }

  get user(): UserLogged {
    return this._userLogged;
  }

  get userMenu(): any[] {
    if (!this.user) {
      return [{
        title: 'Server',
        click: 'showServer'
      }, {
        title: 'Login',
        click: 'login'
      }];
    }
    return [{
      title: 'Server',
      click: 'showServer'
    }, {
      title: 'Profile'
    }, {
      title: 'Log Out',
      click: 'logout'
    }];
  }
}
