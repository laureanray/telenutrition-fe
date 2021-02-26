import { Component, OnInit } from '@angular/core';
import {LogoutModalComponent} from '../../../core/shared/logout-modal/logout-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {
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

  showLogoutModal(): void{
    this.dialog.open(LogoutModalComponent, {
      width: '450px'
    });
  }
}
