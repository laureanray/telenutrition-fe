import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Patient} from '../../../core/models/patient';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  patient: Patient;
  constructor(private authService: AuthenticationService) {
    this.patient = this.authService.currentUserValue as Patient;
  }

  ngOnInit(): void {
  }

}
