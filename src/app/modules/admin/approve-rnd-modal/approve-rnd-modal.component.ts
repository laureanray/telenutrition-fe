import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Router} from '@angular/router';
import {RndService} from '../../../core/services/rnd.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-approve-rnd-modal',
  templateUrl: './approve-rnd-modal.component.html',
  styleUrls: ['./approve-rnd-modal.component.scss']
})
export class ApproveRndModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ApproveRndModalComponent>,
    private router: Router,
    private rndService: RndService
  ) {
  }


  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  approve(): void {
    // this.authenticationService.logout();
    // this.router.navigate(['/login']);
    // this.dialogRef.close();
    this.rndService.approveRnd(this.data.username)
      .subscribe(res => {
        if (res) {
          this.dialogRef.close({result: 'ok'});
        }
      }, error => {
        this.dialogRef.close({result: 'err'});
        alert(error);
      });
  }
}
