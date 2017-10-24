import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  private _loginForm: FormGroup;
  constructor(private builder: FormBuilder) {}

  ngOnInit() {
    this._loginForm = this.builder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    console.log(this._loginForm.value);
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }
}
