import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UsersService, Role, User } from '../../services/shared/users/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private _user: User = new User();
  private _roles: Role[];
  @Output() private saveUser: EventEmitter<any> = new EventEmitter<any>();
  constructor(private usersService: UsersService) {
    usersService.getRoles()
      .subscribe(roles => {
        this._roles = roles;
      });
  }

  ngOnInit() {
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
  }

  get roles(): Role[] {
    return this._roles;
  }
}
