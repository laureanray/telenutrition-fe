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

    this.medicalRecordsForm.valueChanges.subscribe(
      res => {
        console.log(res);
      }
    );

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
}
