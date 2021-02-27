import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {PatientService} from '../../../core/services/patient.service';
import {Patient} from '../../../core/models/patient';
import * as uuid from 'uuid';
import {HttpEventType} from '@angular/common/http';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {environment} from '../../../../environments/environment';
import {User} from '../../../core/models/user';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  updateAccountForm: FormGroup;
  submitting = false;
  updateResult = '';
  errorMessage = '';
  isLinear = true;
  // uploadedFilePath: string;
  public progress = 0;
  public message = '';

  patient: Patient;

  constructor(private fb: FormBuilder, private patientService: PatientService, private authService: AuthenticationService) {
    this.updateAccountForm = this.fb.group({
      contactNumber: ['', [Validators.required, Validators.min(11)]],
      password: ['', [Validators.required, this.passwordValidator2(), this.passwordStrengthValidator()]],
      file: ['', Validators.required],
      passwordConfirm: new FormControl('', this.passwordValidator())
    });

    this.patient = this.authService.currentUserValue as Patient;
    console.log(this.patient);
  }

  public uploadFile(files: any): void  {
    console.log(files);
    if (files.length === 0) {
      return;
    }

    const fileToUpload = files[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    // uuid.v4();
    this.patientService.uploadProfile(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          const body = event.body;
          // this.uploadedFilePath = body.dbPath;
          // console.log(body);
          this.patient.profileImageURL = `${environment.apiUrl}/file/files/${body.path}`;
          console.log(this.patient);
          this.patientService.updatePhoto(this.patient).subscribe(result => {
            console.log(result);
            if (result) {
              this.authService.updateUser(result as User);
            }
          });
        }
      });
  }


  fileChange(files: any): void{
    this.uploadFile(files);
  }


  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitting = true;
    const patient = {
      email: this.updateAccountForm.value.email,
      password: this.updateAccountForm.value.password
    } as Patient;

    setTimeout(() => {
      this.patientService.registerPatient(patient).subscribe(res => {
        if (res) {
          this.submitting = false;
          this.updateResult = 'success';
        }
      }, error => {
        this.submitting = false;
        this.updateResult = 'error';
        console.log(error);
        this.errorMessage = error.message;
      });
    }, 900);
  }

  passwordValidator2(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.updateAccountForm?.controls.passwordConfirm.value.length > 0) {
        return  control.value === this.updateAccountForm?.controls.passwordConfirm.value
          ? null : {passwordMismatch: control.value};
      }
      return  null;
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value === this.updateAccountForm?.controls.password.value
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
    this.updateAccountForm.controls.password.updateValueAndValidity();
  }

}
