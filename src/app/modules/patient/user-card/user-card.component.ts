import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {User} from '../../../core/models/user';
import {Patient} from '../../../core/models/patient';
import {RND} from '../../../core/models/rnd';
import {Admin} from '../../../core/models/admin';
import {PatientService} from '../../../core/services/patient.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  public patient: Patient;
  constructor(private authService: AuthenticationService,
              private patientService: PatientService) {
    this.patientService.getPatient(this.authService.currentUserValue.username)
      .subscribe((p: Patient) => {
        this.patient = p;
      });
  }

  ngOnInit(): void {
  }

}
