import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RndService} from '../../../core/services/rnd.service';
import {RND} from '../../../core/models/rnd';
import {environment} from '../../../../environments/environment';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {ApproveRndModalComponent} from '../approve-rnd-modal/approve-rnd-modal.component';

@Component({
  selector: 'app-view-rnd',
  templateUrl: './view-rnd.component.html',
  styleUrls: ['./view-rnd.component.scss']
})
export class ViewRndComponent implements OnInit {
  rnd: RND;
  environment: any;
  moment: any;

  constructor(private route: ActivatedRoute,
              private rndService: RndService,
              private dialog: MatDialog) {
    this.moment = moment;
  }

  fetchCurrentRND(username: string): void {
    this.rndService.getRND(username)
      .subscribe(res => {
        console.log(res);
        this.rnd = res as RND;
      }, error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.environment = environment;
    const routeParams = this.route.snapshot.paramMap;
    const username = routeParams.get('username');
    this.fetchCurrentRND(username);
  }

  approve(): void {
    const dialogRef = this.dialog.open(ApproveRndModalComponent, {
      width: '450px',
      data: {
        username: this.rnd.username
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.result === 'ok') {
        this.fetchCurrentRND(this.rnd.username);
      }
    });
  }
}
