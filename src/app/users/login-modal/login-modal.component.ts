import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ng2-webstorage';

import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'scrum-login-modal',
  templateUrl: './login-modal.component.html'
})
export class LoginModalComponent implements OnInit {
  private _loginForm: FormGroup;
  constructor(private service: UsersService, private builder: FormBuilder, private storage: LocalStorageService,
    private modal: NgbActiveModal) {
  }

  ngOnInit() {
    this._loginForm = this.builder.group({
      user: [this.rememberMe ? this.storage.retrieve('user-login') : '', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.rememberMe) {
      this.storage.store('user-login', this._loginForm.value.user);
    }
    this.service.login(this._loginForm.value);
    this.modal.close(true);
  }

  close() {
    this._loginForm.reset({
      user: this.rememberMe ? this.storage.retrieve('user-login') : ''
    });
    this.modal.close();
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  get rememberMe(): boolean {
    return this.storage.retrieve('remember-me') as boolean;
  }

  set rememberMe(value: boolean) {
    this.storage.store('remember-me', value);
  }
}
