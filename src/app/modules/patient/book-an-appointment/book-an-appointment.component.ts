import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../../../core/services/patient.service';

@Component({
  selector: 'app-book-an-appointment',
  templateUrl: './book-an-appointment.component.html',
  styleUrls: ['./book-an-appointment.component.scss']
})
export class BookAnAppointmentComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService) {}
  isLinear = false;
  // @ts-ignore
  formGroup: FormGroup;
  // @ts-ignore
  secondFormGroup: FormGroup;
  // @ts-ignore
  thirdFormGroup: FormGroup;
  // @ts-ignore
  fourthFormGroup: FormGroup;

  todayDate: Date = new Date();

  isSubmitting = false;

  result = '';

  formArray: any;

  times =  [
    '10:00 AM',
    '11:00 AM',
    '12:00 AM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
  ];

  selected = '';

  ngOnInit(): void {
    this.formArray = this.formBuilder.array([
      this.formBuilder.group({
        preferredSchedule: ['', Validators.required]
      }),
      this.formBuilder.group({
        appointmentTime: ['', Validators.required]
      }),
      this.formBuilder.group({
        complaints: ['', Validators.required],
        currentMedications: ['', Validators.required],
      }),
      this.formBuilder.group({
        paymentMethod: ['', Validators.required]
      })
    ]);

    this.formGroup = this.formBuilder.group({
     formArray: this.formArray
    });
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    if (d === null) {
      d = new Date();
    }
    return (day !== 0 && day !== 6);
  }

  onSubmit(): void {
    this.isSubmitting = true;
    console.log(this.formGroup.value);
  }
}
