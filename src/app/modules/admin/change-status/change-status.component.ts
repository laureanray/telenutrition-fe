import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Router} from '@angular/router';
import {AppointmentService} from '../../../core/services/appointment.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Appointment} from '../../../core/models/appointment';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit {
  isApplying = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChangeStatusComponent>,
    private appointmentService: AppointmentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  selected = 'PENDING_PAYMENT';

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  apply(): void {
    // this.authenticationService.logout();
    // this.router.navigate(['/login']);
    this.isApplying = true;

    const appointment = this.data.appointment as Appointment;
    appointment.status = this.selected;
    appointment.patient.roles = null;
    setTimeout(() => {
      this.appointmentService.updateAppointment(appointment)
        .subscribe(res => {
          if (res) {
            this.snackBar.open('Success!', undefined, {
              duration: 3000
            });
          }

          this.isApplying = false;
          this.dialogRef.close();
        }, error => {
          this.snackBar.open('Unexpected Error Occured!', undefined, {
            duration: 3000
          });
          this.isApplying = false;
          this.dialogRef.close();
        });
    }, 500);
  }
}
