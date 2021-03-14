import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppointmentService} from '../../../core/services/appointment.service';
import {RndService} from '../../../core/services/rnd.service';
import {RND} from '../../../core/models/rnd';

@Component({
  selector: 'app-assign-rnd-modal',
  templateUrl: './assign-rnd-modal.component.html',
  styleUrls: ['./assign-rnd-modal.component.scss']
})
export class AssignRndModalComponent implements OnInit {
  isApplying = false;
  rnds: RND[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AssignedNodesOptions>,
    private appointmentService: AppointmentService,
    private rndService: RndService) {
  }

  ngOnInit(): void {
  }

  apply(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
