import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {User} from '../../../core/models/user';
import {Patient} from '../../../core/models/patient';
import {RND} from '../../../core/models/rnd';
import {Admin} from '../../../core/models/admin';
import {PatientService} from '../../../core/services/patient.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, OnDestroy {
  public patient: Patient;
  patientS: Subscription;
  constructor(private authService: AuthenticationService,
              private patientService: PatientService) {
    this.patientS = this.patientService.getPatient(this.authService.currentUserValue.username)
      .subscribe((p: Patient) => {
        this.patient = p;
        console.log(this.patient.medicalRecord);
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.patientS.unsubscribe();
  }
}
