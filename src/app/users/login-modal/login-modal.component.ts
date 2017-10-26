import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LocalStorageService } from 'ng2-webstorage';

import { UsersService } from '../../services/shared/users/users.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, AfterViewInit {
  private _loginForm: FormGroup;
  private _onLogin: EventEmitter<boolean>;
  @ViewChild('dataLoginClose') private btnClose: ElementRef;
  constructor(private service: UsersService, private builder: FormBuilder, private storage: LocalStorageService) {
    this._onLogin = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this._loginForm = this.builder.group({
      user: [this.rememberMe ? this.storage.retrieve('user-login') : '', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngAfterViewInit() {
  }

  login() {
    if (this.rememberMe) {
      this.storage.store('user-login', this._loginForm.value.user);
    }
    this.service.login(this._loginForm.value);
    this._onLogin.emit(true);
    this.btnClose.nativeElement.click();
  }

  close() {
    this._loginForm.reset({
      user: this.rememberMe ? this.storage.retrieve('user-login') : ''
    });
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

 @Output() get onLogin(): EventEmitter<boolean> {
    return this._onLogin;
  }

  get rememberMe(): boolean {
    return this.storage.retrieve('remember-me') as boolean;
  }

  set rememberMe(value: boolean) {
    this.storage.store('remember-me', value);
  }
}
