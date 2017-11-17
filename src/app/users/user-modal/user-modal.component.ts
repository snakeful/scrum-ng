import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { cloneDeep, isNil } from 'lodash';
import { User, UserLogged } from '../../shared/classes/users.class';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'scrum-user-modal',
  templateUrl: './user-modal.component.html'
})
export class UserModalComponent implements OnInit {
  private _userForm: FormGroup;
  private _userLogged: UserLogged;
  private _user: User = new User();
  constructor(private service: UsersService, private formBuilder: FormBuilder, private modal: NgbActiveModal,
    private alert: NotificationsService) {
    this._userForm = formBuilder.group({
      id: [null],
      user: [{
        value: '',
        disabled: !this.userLogged.admin
      }, Validators.required],
      firstName: [{
        value: '',
        disabled: !this.userLogged.admin
      }, Validators.required],
      lastName: [{
        value: '',
        disabled: !this.userLogged.admin
      }, Validators.required],
      email: [{
        value: '',
        disabled: !this.userLogged.admin
      }, Validators.required],
      password: [{
        value: '',
        disabled: !this.userLogged.admin
      }],
      confirm: [{
        value: '',
        disabled: !this.userLogged.admin
      }]
    });
  }

  ngOnInit() {
  }

  close() {
    this.modal.close();
  }

  doSaveUser(user: User) {
    if (!isNil(user.password) || !isNil(user.confirm)) {
      if (user.password !== user.confirm) {
        this.alert.warn('Password and confirm must be the same.');
        return;
      }
    }
    const newUser = isNil(user.id);
    (newUser ? this.service.createUser(user) : this.service.saveUser(user.id, user))
      .subscribe(updatedUser => {
        updatedUser.password = null;
        updatedUser.confirm = null;
        this.modal.close(updatedUser);
        this.alert.success(`User ${updatedUser.user}`, `User ${newUser ? 'created' : 'saved'}.`, {
          timeOut: 2000,
          showProgressBar: false
        });
      });
  }

  get userForm(): FormGroup {
    return this._userForm;
  }

  get userLogged(): UserLogged {
    return this.service.userLogged;
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
