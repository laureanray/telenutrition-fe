import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {RndService} from '../../../core/services/rnd.service';
import {SupportService} from '../../../core/services/support.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SupportTicket} from '../../../core/models/support-ticket';

@Component({
  selector: 'app-mark-resolved-modal',
  templateUrl: './mark-resolved-modal.component.html',
  styleUrls: ['./mark-resolved-modal.component.scss']
})
export class MarkResolvedModalComponent implements OnInit {
  resolution = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<MarkResolvedModalComponent>,
              private supportService: SupportService,
              private snackbar: MatSnackBar) {
    console.log(this.data);
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resolve(): void {
    this.supportService.getTicketById(this.data)
      .subscribe((res) => {
        if (res) {
            const ticket = res as SupportTicket;
            ticket.resolution = this.resolution;
            ticket.status = 'resolved';
            this.supportService.updateTicket(ticket)
              .subscribe((result) => {
                if (result) {
                  this.snackbar.open('Success', undefined, {
                    duration: 3000
                  });

                  this.dialogRef.close();
                }
              });
        }
      }, error => {
        this.snackbar.open('Error!', undefined, {
          duration: 3000
        });
      });
  }
}
