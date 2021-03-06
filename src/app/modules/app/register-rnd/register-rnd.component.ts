import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {RndService} from '../../../core/services/rnd.service';
import {RND} from '../../../core/models/rnd';
import {HttpEventType} from '@angular/common/http';
import * as uuid from 'uuid';
import {FileService} from '../../../core/services/file.service';

@Component({
  selector: 'app-register-rnd',
  templateUrl: './register-rnd.component.html',
  styleUrls: ['./register-rnd.component.scss']
})
export class RegisterRndComponent implements OnInit {
  registerForm: FormGroup;
  tempUsername = '';
  submitting = false;
  registerResult = '';
  errorMessage = '';
  progress = 0;
  message = '';
  rnd = new RND();
  uploadedFilePaths = [];
  filesToUpload = 0;
  doneUploaded = 0;
  isUploading = false;

  constructor(private fb: FormBuilder, private rndService: RndService, private fileService: FileService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: new FormControl({value: null, disabled: true}, Validators.required),
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contactNumber: ['', [Validators.required, Validators.min(11)]],
      password: ['', [Validators.required, this.passwordValidator2(), this.passwordStrengthValidator()]],
      passwordConfirm: new FormControl('', this.passwordValidator()),
      files: ['', Validators.required]
    });
  }


  public uploadFile(files: any): void {
    this.isUploading = true;
    console.log(files);
    if (files.length === 0) {
      return;
    } else {
      this.filesToUpload = files.length;
      for (const file of files) {
        const fileToUpload = file as File;
        const formData = new FormData();
        formData.append('file', fileToUpload, uuid.v4() + '.' + fileToUpload.type.split('/')[1]);

        this.fileService.upload(formData)
          .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
              const body = event.body;
              this.uploadedFilePaths.push({ path: body.path});
              console.log(this.uploadedFilePaths);
              this.doneCallback();
            }
          });
      }
    }
  }

  doneCallback(): void {
    this.doneUploaded++;

    if (this.doneUploaded === this.filesToUpload) {
      console.log('Done! uploading ' + this.filesToUpload + ' files');

      this.registerForm.patchValue({
        files: this.uploadedFilePaths
      });

      this.isUploading = false;
    }
  }


  fileChange(files: any): void {
    this.uploadFile(files);
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
    this.rnd.firstName = this.registerForm.value.firstName;
    this.rnd.lastName = this.registerForm.value.lastName;
    this.rnd.username = this.registerForm.controls.username.value;
    this.rnd.email = this.registerForm.value.email;
    this.rnd.password = this.registerForm.value.password;
    this.rnd.files = this.uploadedFilePaths;

    setTimeout(() => {
      this.rndService.registerRND(this.rnd).subscribe(res => {
        if (res) {
          this.submitting = false;
          this.registerResult = 'success';
        }
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
        return control.value === this.registerForm?.controls.passwordConfirm.value
          ? null : {passwordMismatch: control.value};
      }
      return null;
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
