import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../../../core/services/patient.service';
import * as _ from 'lodash';
import {Appointment} from '../../../core/models/appointment';
import * as moment from 'moment';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {AppointmentService} from '../../../core/services/appointment.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Patient} from '../../../core/models/patient';

@Component({
  selector: 'app-book-an-appointment',
  templateUrl: './book-an-appointment.component.html',
  styleUrls: ['./book-an-appointment.component.scss']
})
export class BookAnAppointmentComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private authService: AuthenticationService,
              private appointmentService: AppointmentService,
              private snackBar: MatSnackBar) {
    this.moment = moment;
    this.patientService.getPatient(this.authService.currentUserValue.username)
        .subscribe((pt: Patient) => {
          this.patient = pt;
          this.formArray.controls[3].patchValue({
            complaints: pt.medicalRecord?.complaints,
            currentMedications: pt.medicalRecord?.currentMedications
          });
        });
  }

  patient: Patient;
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

  appointment: Appointment;

  moment: any;
  resultId: any;

  times = [
    {display: '10:00 AM', value: '10:00'},
    {display: '11:00 AM', value: '11:00'},
    {display: '12:00 PM', value: '12:00'},
    {display: '1:00 PM', value: '13:00'},
    {display: '2:00 PM', value: '14:00'},
    {display: '3:00 PM', value: '15:00'},
    {display: '4:00 PM', value: '16:00'},
    {display: '5:00 PM', value: '17:00'},
    {display: '6:00 PM', value: '18:00'},
  ];

  selected = '';
  selectedAppointmentType = '';

  ngOnInit(): void {
    this.formArray = this.formBuilder.array([
      this.formBuilder.group({
        appointmentDate: ['', Validators.required]
      }),
      this.formBuilder.group({
        appointmentTime: ['', Validators.required]
      }),
      this.formBuilder.group({
        appointmentType: ['', Validators.required]
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


    this.formGroup.valueChanges.subscribe(s => {
      console.log(this.formGroup.valid);
    });

    // console.log();

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
    // tslint:disable-next-line:only-arrow-functions
    const data = this.formArray.value.reduce((acc, item) => {
      const obj = {...item};
      // tslint:disable-next-line:no-shadowed-variable
      Object.keys(obj).forEach((item) => {
        if (acc[item]) {
          Object.assign(acc[item], obj[item]);
        } else { // else add the key-value pair to the accumulator object.
          acc[item] = obj[item];
        }
      });
      return acc;
    }, {});

    console.log(data);

    data.appointmentDate = moment(data.appointmentDate).format('L');

    // switch (data.appointmentType) {
    //   case 'nutrition_counseling':
    //     data.amountDue = 400;
    //     break;
    //   case 'one_week_cycle_menu':
    //     data.amountDue = 500;
    //     break;
    //   case 'both':
    //     data.amountDue = 900;
    //     break;
    // }

    const appointment = {
      patient: {
        id: this.authService.currentUserValue.id
      },
      complaints: data.complaints,
      currentMedications: data.currentMedications,
      paymentMethod: data.paymentMethod,
      appointmentType: data.appointmentType,
      amountDue: data.amountDue,
      schedule: moment(`${data.appointmentDate} ${data.appointmentTime}`, 'MM/DD/YYYY HH:mm').format()
    } as Appointment;

    console.log(appointment);

    setTimeout(() => {
      this.appointmentService.createAppointment(appointment)
        .subscribe(res => {
          if (res) {
            this.result = 'success';
            this.isSubmitting = false;
            this.snackBar.open('Success!', undefined, {
              duration: 3000
            });
            this.appointment = res;
            this.resultId = res.id;
          }
        }, error => {
          this.result = 'error';
          this.isSubmitting = false;
        });
    }, 800);

  }
}
