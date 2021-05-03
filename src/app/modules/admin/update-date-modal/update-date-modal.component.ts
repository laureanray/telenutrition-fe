import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppointmentService} from '../../../core/services/appointment.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Appointment} from '../../../core/models/appointment';
import * as moment from 'moment';
@Component({
  selector: 'app-update-date-modal',
  templateUrl: './update-date-modal.component.html',
  styleUrls: ['./update-date-modal.component.scss']
})
export class UpdateDateModalComponent implements OnInit {
  date: any;
  todayDate: Date = new Date();
  time: string;
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<UpdateDateModalComponent>,
              private appointmentService: AppointmentService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    if (d === null) {
      d = new Date();
    }
    return (day !== 0 && day !== 6);
  }

  submit(): void {
    const appointment = this.data.appointment as Appointment;
    this.date = moment(this.date).format('L');
    appointment.schedule = moment(`${this.date} ${this.time}`, 'MM/DD/YYYY HH:mm').format();
    console.log(this.date, this.time);
    console.log(appointment.schedule);
    appointment.patient.roles = undefined;
    this.appointmentService.updateAppointment(appointment)
      .subscribe(res => {
        if (res) {
          this.snackBar.open('Success', undefined, {
            duration: 3000
          });

          this.dialogRef.close();
        }
      }, error => {
        this.snackBar.open('Unexpected Error Occurred', undefined, {
          duration: 3000
        });
      });
  }
}
