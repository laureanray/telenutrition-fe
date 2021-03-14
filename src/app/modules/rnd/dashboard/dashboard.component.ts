import { Component, OnInit } from '@angular/core';
import {RND} from '../../../core/models/rnd';
import {AuthenticationService} from '../../../core/authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rnd: RND;

  constructor(private authService: AuthenticationService) {
    this.rnd = this.authService.currentUserValue as RND;
  }

  ngOnInit(): void {
  }

}
