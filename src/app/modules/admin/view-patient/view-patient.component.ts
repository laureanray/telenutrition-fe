import { Component, OnInit } from '@angular/core';
import {RND} from '../../../core/models/rnd';
import {ActivatedRoute} from '@angular/router';
import {RndService} from '../../../core/services/rnd.service';
import {MatDialog} from '@angular/material/dialog';
import {ApproveRndModalComponent} from '../approve-rnd-modal/approve-rnd-modal.component';
import { environment } from 'src/environments/environment';
import {PatientService} from '../../../core/services/patient.service';
import * as moment from 'moment';
import {Patient} from '../../../core/models/patient';
@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss']
})
export class ViewPatientComponent implements OnInit {
  patient: Patient;
  environment: any;
  moment: any;

  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private dialog: MatDialog) {
    this.moment = moment;
  }

  fetchCurrentPatient(username: string): void {
    this.patientService.getPatient(username)
      .subscribe(res => {
        console.log(res);
        this.patient = res as Patient;
      }, error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.environment = environment;
    const routeParams = this.route.snapshot.paramMap;
    const username = routeParams.get('username');
    this.fetchCurrentPatient(username);
  }
  //
  // approve(): void {
  //   const dialogRef = this.dialog.open(ApproveRndModalComponent, {
  //     width: '450px',
  //     data: {
  //       username: this.patient.username
  //     }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(data => {
  //     if (data.result === 'ok') {
  //       this.fetchCurrentRND(this.patient.username);
  //     }
  //   });
  // }
}
