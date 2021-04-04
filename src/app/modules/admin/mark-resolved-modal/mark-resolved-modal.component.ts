import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {RndService} from '../../../core/services/rnd.service';
import {SupportService} from '../../../core/services/support.service';

@Component({
  selector: 'app-mark-resolved-modal',
  templateUrl: './mark-resolved-modal.component.html',
  styleUrls: ['./mark-resolved-modal.component.scss']
})
export class MarkResolvedModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<MarkResolvedModalComponent>,
              private supportService: SupportService) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resolve(): void {
    // this.supportService.getTicketById()
  }
}
