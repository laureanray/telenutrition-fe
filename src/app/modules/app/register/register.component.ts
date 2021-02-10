import {Component, OnInit} from '@angular/core';
import {RegisterForm} from '../../../core/models/register-form';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    birthday: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required]
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
    if (this.registerForm.value.firstName > 0 && this.registerForm.value.lastName.length > 0) {
      // @ts-ignore
      const first = this.registerForm.value.firstName?.replace(/\s+/g, '');
      const last =this.registerForm.value.lastName?.replace(/\s+/g, '');
      // @ts-ignore
      this.tempUsername = first + last;
      this.tempUsername = this.tempUsername.toLowerCase();
    } else {
      console.log('else');
      // this.tempUsername = '';
    }
    this.model.username = this.tempUsername;
    console.log(this.model.lastName?.length);
    console.log(this.tempUsername);
  }

  onSubmit(): void {

  }
}
