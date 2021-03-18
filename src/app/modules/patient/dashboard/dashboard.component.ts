import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Patient} from '../../../core/models/patient';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {PatientService} from '../../../core/services/patient.service';
import {Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  patient: Patient;
  patientS: Subscription;
  authS: Subscription;

  constructor(private authService: AuthenticationService,
              private snackBar: MatSnackBar,
              private patientService: PatientService,
              private router: Router) {
    this.authS = this.authService.currentUser
      .subscribe((user: Patient) => {
        if (user?.username) {
          this.patientS = this.patientService.getPatient(user.username)
            .subscribe((p: Patient) => {
              this.patient = p;

              if (!this.patient.medicalRecord) {
                const snackbarRef = this.snackBar.open('Please complete your medical records', 'Okay go now. ', {
                  duration: 10000
                });

                snackbarRef.onAction().subscribe(a => {
                  this.router.navigate(['/patient', 'medical-records']);
                });
              }
            });
        }
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.patientS.unsubscribe();
    this.authS.unsubscribe();
  }

}
