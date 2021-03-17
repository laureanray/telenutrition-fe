import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.authService.currentUserValue;
  }

}
