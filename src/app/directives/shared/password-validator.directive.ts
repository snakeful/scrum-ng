import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

function passwordValidator(control: AbstractControl) {
  if (!control.get('password') || control.get('confirm')) {
    return null;
  }
  return control.get('password').value === control.get('confirm').value ? null : {
    nomatch: true
  };
}

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    multi: true,
    useValue: passwordValidator
  }]
})
export class PasswordValidatorDirective {

  constructor() { }

}
