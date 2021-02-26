import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LogoutModalComponent} from '../../../core/shared/logout-modal/logout-modal.component';

@Component({
  selector: 'app-rnd',
  templateUrl: './rnd.component.html',
  styleUrls: ['./rnd.component.scss']
})
export class RndComponent implements OnInit {
  isProfileDropdownShown = false;
  constructor(private dialog: MatDialog) { }

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
