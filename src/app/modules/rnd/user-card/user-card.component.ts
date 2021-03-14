import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Patient} from '../../../core/models/patient';
import {RND} from '../../../core/models/rnd';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  public rnd: RND;
  constructor(private authService: AuthenticationService) {
    this.rnd = this.authService.currentUserValue as RND;
  }

  ngOnInit(): void {
  }


}
