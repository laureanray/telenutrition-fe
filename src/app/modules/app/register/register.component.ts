import {Component, OnInit} from '@angular/core';
import {RegisterForm} from '../../../core/models/register-form';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {PatientService} from '../../../core/services/patient.service';
import {Patient} from '../../../core/models/patient';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  tempUsername = '';
  submitting = false;
  registerResult = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: new FormControl({value: null, disabled: true}, Validators.required),
      email: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.min(11)]],
      birthday: ['', Validators.required],
      password: ['', [Validators.required, this.passwordValidator2(), this.passwordStrengthValidator()]],
      passwordConfirm: new FormControl('', this.passwordValidator())
    });
  }

  ngOnInit(): void {
  }

  updateUsername(): void {
    // @ts-ignore
    if (this.registerForm.value.firstName.length > 0 && this.registerForm.value.lastName.length > 0) {
      // @ts-ignore
      const first = this.registerForm.value.firstName.replace(/\s+/g, '');
      const last = this.registerForm.value.lastName.replace(/\s+/g, '');
      // @ts-ignore
      this.tempUsername = first + last;
      this.tempUsername = this.tempUsername.toLowerCase();
    }
    this.registerForm.patchValue({
      username: this.tempUsername
    });
  }

  onSubmit(): void {
    this.submitting = true;
    const patient = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      username: this.registerForm.controls.username.value,
      birthday: this.registerForm.value.birthday,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    } as Patient;

    setTimeout(() => {
      this.patientService.registerPatient(patient).subscribe(res => {
        console.log('res' + res);
      }, error => {
        this.submitting = false;
        this.registerResult = 'error';
        console.log(error);
        this.errorMessage = error.message;
      });
    }, 900);
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

  passwordStrengthValidator(): ValidatorFn {
  //  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$');
    // TODO: Fix regex to allow special characters
    return (control: AbstractControl): { [key: string]: any } | null =>
      regex.test(control.value)
        ? null : {passwordStrength: control.value};
  }

  // This forces the password validator to revalidate on confirm_password keyup
  pwKeyup(): void {
    this.registerForm.controls.password.updateValueAndValidity();
  }
}
