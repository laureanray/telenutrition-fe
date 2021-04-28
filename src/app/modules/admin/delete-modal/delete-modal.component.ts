import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SupportService} from '../../../core/services/support.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SupportTicket} from '../../../core/models/support-ticket';
import {PatientService} from '../../../core/services/patient.service';
import {RndService} from '../../../core/services/rnd.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeleteModalComponent>,
              private patientService: PatientService,
              private rndService: RndService,
              private snackbar: MatSnackBar) {
    console.log(this.data);
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(): void {
    if (this.data.role === 'rnd') {
      this.rndService.deleteRnd(this.data.username)
        .subscribe(res => {
          if (res) {
            this.dialogRef.close();
            this.snackbar.open('Success', undefined, {
              duration: 3000
            });
          }
        }, error => {
              this.snackbar.open('Error!', undefined, {
                duration: 3000
              });
        });
    } else {
      this.patientService.deleteRnd(this.data.username)
        .subscribe(res => {
          if (res) {
            this.dialogRef.close();
            this.snackbar.open('Success', undefined, {
              duration: 3000
            });
          }
        }, error => {
          this.snackbar.open('Error!', undefined, {
            duration: 3000
          });
        });
    }
  }
}
