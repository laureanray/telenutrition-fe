import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-an-appointment',
  templateUrl: './book-an-appointment.component.html',
  styleUrls: ['./book-an-appointment.component.scss']
})
export class BookAnAppointmentComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  isLinear = false;
  // @ts-ignore
  firstFormGroup: FormGroup;
  // @ts-ignore
  secondFormGroup: FormGroup;
  // @ts-ignore
  thirdFormGroup: FormGroup;
  // @ts-ignore
  fourthFormGroup: FormGroup;


  times =  [
    '9:00AM',
    '9:30AM'
  ];

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      preferredSchedule: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      appointmentTime: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      complaints: ['', Validators.required],
      currentMedications: ['', Validators.required],
    });
    this.fourthFormGroup = this.formBuilder.group({
      paymentMethod: ['', Validators.required],
    });
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    if (d === null) {
      d = new Date();
    }
    return d > (new Date());
  }

}
