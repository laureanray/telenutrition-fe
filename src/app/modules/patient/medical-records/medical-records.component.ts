import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Patient} from '../../../core/models/patient';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpEventType} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {User} from '../../../core/models/user';
import {FileService} from '../../../core/services/file.service';
import * as uuid from 'uuid';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PatientService} from '../../../core/services/patient.service';
import {MedicalRecord} from '../../../core/models/medical-record';
import * as moment from 'moment';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss']
})
export class MedicalRecordsComponent implements OnInit {
  patient: Patient;
  medicalRecordsForm: FormGroup;
  isEditing = false;
  isSaving = false;
  isUploading = false;
  filesToUpload = [];
  uploadedFilePaths = [];
  bmiString = '';
  hasMedicalRecords = false;
  currentRecords: MedicalRecord;

  constructor(private authService: AuthenticationService,
              private fb: FormBuilder,
              private fileService: FileService,
              private snackBar: MatSnackBar,
              private patientService: PatientService) {
    this.patientService.getPatient(this.authService.currentUserValue.username)
      .subscribe((patient: Patient) => {
        this.patient = patient;

        if (this.patient.medicalRecord) {
          this.hasMedicalRecords = true;
          this.currentRecords = this.patient.medicalRecord;
          console.log('current records', this.currentRecords);
          this.initFormData();
        }

        console.log(this.patient);

        // this.initFormData();
      });


    // this.medicalRecordsForm.valueChanges.subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // );

    this.medicalRecordsForm = this.fb.group({
      age: new FormControl({value: '', disabled: true}, Validators.required),
      birthday: new FormControl({value: '', disabled: true}, Validators.required),
      religion: new FormControl({value: '', disabled: true}, Validators.required),
      sex: new FormControl({value: '', disabled: true}, Validators.required),
      height: new FormControl({value: '', disabled: true}, Validators.required),
      weight: new FormControl({value: '', disabled: true}, Validators.required),
      bmi: new FormControl({value: '', disabled: true}, Validators.required),
      biochemicalResults: new FormControl({value: '', disabled: true}, Validators.required),
      complaints: new FormControl({value: '', disabled: true}, Validators.required),
      currentMedications: new FormControl({value: '', disabled: true}, Validators.required)
    });

    this.medicalRecordsForm.valueChanges.subscribe(
      d => {
        console.log(d);
      }
    );

  }

  initFormData(): void {
    this.medicalRecordsForm.patchValue({
      age: this.currentRecords.age,
      birthday: new Date(this.currentRecords.birthday),
      religion: this.currentRecords.religion,
      sex: this.currentRecords.sex,
      height: this.currentRecords.height,
      weight: this.currentRecords.weight,
      bmi: this.currentRecords.bmi,
      biochemicalResults: this.currentRecords.biochemicalResults,
      complaints: this.currentRecords.complaints,
      currentMedications: this.currentRecords.currentMedications
    });
  }

  ngOnInit(): void {
    window.onbeforeunload = () => {
      confirm('u sure?');
    };
  }

  onSubmit(): void {

  }

  edit(): void {
    this.isEditing = true;
    this.enable();

    console.log(this.medicalRecordsForm.valid, this.medicalRecordsForm.value);
  }

  fileChange(files: any): void {
    this.isUploading = true;
    if (files.length === 0) {
      return;
    }

    const fileToUpload = files[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, uuid.v4() + '.' + fileToUpload.type.split('/')[1]);

    setTimeout(() => {
      this.fileService.upload(formData)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            // this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            // this.message = 'Upload success.';
            const body = event.body;
            // this.uploadedFilePath = body.dbPath;
            // console.log(body);
            const url = `${environment.apiUrl}/file/files/${body.path}`;

            this.medicalRecordsForm.patchValue({
              biochemicalResults: url
            });
            // this.patientService.updatePhoto(this.patient).subscribe(result => {
            //   console.log(result);
            //   if (result) {
            //     this.authService.updateUser(result as User);
            //   }
            // });

            this.isUploading = false;
            this.snackBar.open('Uploaded!', null, {
              duration: 2000
            });

            this.currentRecords = {
              biochemicalResults: url
            } as MedicalRecord;
          }
        }, error => {
          this.isUploading = false;
          this.snackBar.open('Unexpected error occurred!', null, {
            duration: 2000
          });
        });
    }, 1000);
  }

  enable(): void {
    this.medicalRecordsForm.get('age').enable();
    this.medicalRecordsForm.get('birthday').enable();
    this.medicalRecordsForm.get('religion').enable();
    this.medicalRecordsForm.get('sex').enable();
    this.medicalRecordsForm.get('height').enable();
    this.medicalRecordsForm.get('weight').enable();
    // this.medicalRecordsForm.get('bmi').enable();
    this.medicalRecordsForm.get('biochemicalResults').enable();
    this.medicalRecordsForm.get('complaints').enable();
    this.medicalRecordsForm.get('currentMedications').enable();
  }


  disable(): void {
    this.medicalRecordsForm.get('age').disable();
    this.medicalRecordsForm.get('birthday').disable();
    this.medicalRecordsForm.get('religion').disable();
    this.medicalRecordsForm.get('sex').disable();
    this.medicalRecordsForm.get('height').disable();
    this.medicalRecordsForm.get('weight').disable();
    // this.medicalRecordsForm.get('bmi').disable();
    this.medicalRecordsForm.get('biochemicalResults').disable();
    this.medicalRecordsForm.get('complaints').disable();
    this.medicalRecordsForm.get('currentMedications').disable();
  }

  update(): void {
    if (this.medicalRecordsForm.value.weight > 0 && this.medicalRecordsForm.value.height > 0) {
      // tslint:disable-next-line:radix
      let bmi = parseInt(this.medicalRecordsForm.value.weight) / Math.pow(this.medicalRecordsForm.value.height * 0.01, 2);
      bmi = Math.round(bmi * 100) / 100;
      this.medicalRecordsForm.patchValue({
        bmi
      });

      if (bmi) {
        if (bmi < 17.5) {
          this.bmiString = 'Underweight';
        } else if (bmi >= 17.5 && bmi <= 22.99  ) {
          this.bmiString = 'Normal';
        } else if (bmi >= 23 && bmi <= 27.99) {
          this.bmiString = 'Over weight';
        } else if (bmi >= 28) {
          this.bmiString = 'Obese';
        }
      } else {
        this.bmiString = '';
      }

    } else {
      console.log(this.medicalRecordsForm.value);
    }
  }

  save(): void {
    this.disable();
    // this.isEditing = false;
    this.isSaving = true;

    const medicalRecords = {
      id: this.currentRecords.id ? this.currentRecords.id : 0,
      age: this.medicalRecordsForm.controls.age.value,
      birthday: moment(this.medicalRecordsForm.controls.birthday.value).toISOString(),
      religion: this.medicalRecordsForm.controls.religion.value,
      sex: this.medicalRecordsForm.controls.sex.value,
      height: this.medicalRecordsForm.controls.height.value,
      weight: this.medicalRecordsForm.controls.weight.value,
      bmi: this.medicalRecordsForm.controls.bmi.value,
      biochemicalResults: this.medicalRecordsForm.controls.biochemicalResults.value,
      complaints: this.medicalRecordsForm.controls.complaints.value,
      currentMedications: this.medicalRecordsForm.controls.currentMedications.value
    } as MedicalRecord;

    // this.patientService.updateP

    this.patient.medicalRecord = medicalRecords;

    console.log(medicalRecords);

    setTimeout(() => {
      this.patientService.updateMedicalRecords(this.patient)
        .subscribe((p: Patient) => {
          this.patient = p;
          this.snackBar.open('Success!', null, {
            duration: 2000
          });

          this.currentRecords = p.medicalRecord;

          this.isSaving = false;
          this.isEditing = false;
        }, error => {
          this.snackBar.open('Unexpected Error Occured!', null, {
            duration: 2000
          });

          console.log(error);
        });
    }, 600);
  }
}
