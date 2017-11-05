import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationsService } from 'angular2-notifications';

import { cloneDeep, isNil } from 'lodash';
import { User, UserLogged } from '../../shared/classes/users.class';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit, AfterViewInit {
  private _userForm: FormGroup;
  private _userLogged: UserLogged;
  private _user: User = new User();
  @Output() private saveUser: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dataUserClose') btnClose: ElementRef;
  constructor(private service: UsersService, private formBuilder: FormBuilder, private alert: NotificationsService) {
    this._userForm = formBuilder.group({
      id: [null],
      user: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      confirm: ['']
    });
    this._userLogged = service.userLogged;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  doSaveUser(user: User) {
    if (!isNil(user.password) || !isNil(user.confirm)) {
      if (user.password !== user.confirm) {
        this.alert.warn('Password and confirm must be the same.');
        return;
      }
    }
    const newUser: boolean = isNil(user.id);
    (newUser ? this.service.createUser(user) : this.service.saveUser(user.id, user))
      .subscribe(updatedUser => {
        updatedUser.password = null;
        updatedUser.confirm = null;
        this.alert.success(`User ${updatedUser.user}`, `User ${newUser ? 'created' : 'saved'}.`, {
          timeOut: 2000,
          showProgressBar: false
        });
        this.saveUser.emit({
          user: updatedUser,
          btnClose: this.btnClose
        });
      });
  }

  get userForm(): FormGroup {
    return this._userForm;
  }

  get userLogged(): UserLogged {
    return this._userLogged;
  }

  get user(): User {
    return this._user;
  }

  @Input() set user(value: User) {
    if (isNil(value)) {
      this._userForm.patchValue(new User());
    } else {
      this._userForm.patchValue(value);
    }
    this._userForm.markAsPristine();
  }
}
