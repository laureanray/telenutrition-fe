import {Component, OnInit} from '@angular/core';
import {RegisterForm} from '../../../core/models/register-form';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: new FormControl({value: null, disabled: true}, Validators.required),
    email: ['', Validators.required],
    birthday: ['', Validators.required],
    password: ['', [Validators.required, this.passwordValidator2()]],
    passwordConfirm: new FormControl('', this.passwordValidator())
  });
  tempUsername = '';
  model = new RegisterForm();

  constructor(private fb: FormBuilder) {


  }

  ngOnInit(): void {
  }

  updateUsername(): void {

    // console.log(this.registerForm.value)
    // @ts-ignore
    if (this.registerForm.value.firstName.length > 0 && this.registerForm.value.lastName.length > 0) {
      // @ts-ignore
      const first = this.registerForm.value.firstName.replace(/\s+/g, '');
      const last = this.registerForm.value.lastName.replace(/\s+/g, '');
      // @ts-ignore
      this.tempUsername = first + last;
      console.log(first);
      this.tempUsername = this.tempUsername.toLowerCase();
    }
    this.model.username = this.tempUsername;
    console.log(this.tempUsername);

    this.registerForm.patchValue({
      username: this.tempUsername
    });

    console.log(this.registerForm.controls.password.value);
  }

  onSubmit(): void {

  }

  passwordValidator2(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.registerForm?.controls.passwordConfirm.value.length > 0) {
        return  control.value === this.registerForm?.controls.passwordConfirm.value
          ? null : {passwordMismatch: control.value};
      }
      return  null;
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value === this.registerForm?.controls.password.value
        ? null : {passwordMismatch: control.value};
  }
}
