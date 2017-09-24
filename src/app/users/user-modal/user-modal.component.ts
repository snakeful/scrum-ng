import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NotificationsService } from "angular2-notifications";
import { cloneDeep } from "lodash";
import { UsersService, Role, User } from "../../services/shared/users/users.service";

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit, AfterViewInit {
  private _roles: Role[];
  private _user: User = new User();
  @Output() private saveUser: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dataUserClose') btnClose: ElementRef;
  constructor(private usersService: UsersService, private alert: NotificationsService) {
    usersService.getRoles().then(roles => {
      this._roles = roles;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }
  
  public doSaveUser() {
    this.alert.success(`User ${this._user.user}`, `User ${this._user.id ? 'saved' : 'created'}.`, {
      timeOut: 2000,
      showProgressBar: false
    });
    this.saveUser.emit({
      user: this._user,
      btnClose: this.btnClose
    });
  }
  
  get roles(): Role[] {
    return this._roles;
  }
  
  get user(): User {
    return this._user;
  }

  @Input() set user(value: User) {
    if (!value) {
      this._user = new User();
    } else {
      this._user = cloneDeep(value);
    }
  }

}
