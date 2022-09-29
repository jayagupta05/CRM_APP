import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value;
    const passControl = control.root.get('confirmPassword');
    if (passControl) {
      const passValue = passControl.value;
      if (
        passValue !== password ||
        passValue === '' ||
        passValue === null ||
        passValue === undefined ||
        password === '' ||
        password == null ||
        password === undefined ||
        password !== passValue
      ) {
        control.get('confirmPassword').setErrors({ noPassswordMatch: true });
        return {
          isError: true,
        };
      }
    } else {
      return null;
    }
  }
}