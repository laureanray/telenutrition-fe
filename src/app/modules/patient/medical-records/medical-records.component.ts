import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Patient} from '../../../core/models/patient';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(private authService: AuthenticationService,
              private fb: FormBuilder) {
    this.patient = this.authService.currentUserValue as Patient;
    this.medicalRecordsForm = this.fb.group({
      age: new FormControl({value: '', disabled: true}, Validators.required),
      birthday: new FormControl({value: '', disabled: true}, Validators.required),
      religion: new FormControl({value: '', disabled: true}, Validators.required),
      height: new FormControl({value: '', disabled: true}, Validators.required),
      weight: new FormControl({value: '', disabled: true}, Validators.required),
      bmi: new FormControl({value: '', disabled: true}, Validators.required),
      biochemicalResults: new FormControl({value: '', disabled: true}, Validators.required),
      complaints: new FormControl({value: '', disabled: true}, Validators.required),
      currentMedications: new FormControl({value: '', disabled: true}, Validators.required)
    });

    // this.medicalRecordsForm.valueChanges.subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // );

  }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }

  edit(): void {
    this.isEditing = true;
    this.enable();
  }

  fileChange(files: any): void {

  }

  enable(): void {
    this.medicalRecordsForm.get('age').enable();
    this.medicalRecordsForm.get('birthday').enable();
    this.medicalRecordsForm.get('religion').enable();
    this.medicalRecordsForm.get('height').enable();
    this.medicalRecordsForm.get('weight').enable();
    this.medicalRecordsForm.get('bmi').enable();
    this.medicalRecordsForm.get('biochemicalResults').enable();
    this.medicalRecordsForm.get('complaints').enable();
    this.medicalRecordsForm.get('currentMedications').enable();
  }


  disable(): void {
    this.isEditing = false;
    this.medicalRecordsForm.get('age').disable();
    this.medicalRecordsForm.get('birthday').disable();
    this.medicalRecordsForm.get('religion').disable();
    this.medicalRecordsForm.get('height').disable();
    this.medicalRecordsForm.get('weight').disable();
    this.medicalRecordsForm.get('bmi').disable();
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
        if (bmi < 18.5) {
          this.bmiString = 'Underweight';
        } else if (bmi >= 18.5 && bmi <= 22.9) {
          this.bmiString = 'Normal';
        } else if (bmi >= 23 && bmi <= 24.9) {
          this.bmiString = 'At risk';
        } else if (bmi >= 25 && bmi <= 29.9) {
          this.bmiString = 'Obese I';
        } else if (bmi > 30) {
          this.bmiString = 'Obese II';
        }
      } else {
        this.bmiString = '';
      }

    } else {
      console.log(this.medicalRecordsForm.value);
    }
  }
}
