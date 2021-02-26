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
    this.authService.currentUser.subscribe(u => {
      if (u !== null) {
        switch (u.roleName) {
          case 'ROLE_RND':
            this.user = u as RND;
            break;
          case 'ROLE_PATIENT':
            this.user = u as Patient;
            break;
          default:
            this.user = u as Admin;
            break;
        }
      }

    });
  }

  ngOnInit(): void {
  }

}
