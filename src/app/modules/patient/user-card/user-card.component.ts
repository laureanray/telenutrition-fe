import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {User} from '../../../core/models/user';
import {Patient} from '../../../core/models/patient';
import {RND} from '../../../core/models/rnd';
import {Admin} from '../../../core/models/admin';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  public user: Patient|RND|Admin;
  constructor(private authService: AuthenticationService) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
  }

}
