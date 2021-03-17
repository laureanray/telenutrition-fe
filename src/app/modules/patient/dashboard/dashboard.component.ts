import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Patient} from '../../../core/models/patient';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  patient: Patient;

  constructor(private authService: AuthenticationService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.patient = this.authService.currentUserValue as Patient;
  }

  ngOnInit(): void {
    if (!this.patient.medicalRecord) {
      const snackbarRef = this.snackBar.open('Please complete your medical records', 'Okay go now. ', {
        duration: 10000
      });

      snackbarRef.onAction().subscribe(a => {
        this.router.navigate(['/patient', 'medical-records']);
      });
    }
  }

}
