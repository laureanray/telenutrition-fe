import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {
  isProfileDropdownShown = false;
  constructor() { }

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

}
