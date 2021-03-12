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
  public user: any;
  constructor(private authService: AuthenticationService) {
    if (this.authService.currentUserValue.roleName === 'ROLE_PATIENT') {
      this.user = this.authService.currentUserValue as Patient;
    }
  }

  ngOnInit(): void {
  }

}
