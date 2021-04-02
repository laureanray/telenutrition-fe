import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppointmentService} from '../../../core/services/appointment.service';
import {Appointment} from '../../../core/models/appointment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-amount-modal',
  templateUrl: './update-amount-modal.component.html',
  styleUrls: ['./update-amount-modal.component.scss']
})
export class UpdateAmountModalComponent implements OnInit {
  amount: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<UpdateAmountModalComponent>,
              private appointmentService: AppointmentService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    console.log(this.amount);
    const appointment = this.data.appointment as Appointment;
    appointment.amountDue = this.amount;
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
