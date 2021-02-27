import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LogoutModalComponent} from '../../../core/shared/logout-modal/logout-modal.component';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Patient} from '../../../core/models/patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  isProfileDropdownShown = false;
  public patient: Patient;
  constructor(private dialog: MatDialog, private authService: AuthenticationService) {
    this.patient = this.authService.currentUserValue as Patient;
  }

  ngOnInit(): void {
  }

  showProfileDropdown(): void {
    this.isProfileDropdownShown = true;
  }

  hideProfileDropdown(): void {
    this.isProfileDropdownShown = false;
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownShown = !this.isProfileDropdownShown;
  }

  showLogoutModal(): void {
    this.dialog.open(LogoutModalComponent, {
      width: '450px'
    });
  }
}
