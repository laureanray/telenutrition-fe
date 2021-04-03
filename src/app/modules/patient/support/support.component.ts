import {Component, OnInit} from '@angular/core';
import {SupportService} from '../../../core/services/support.service';
import {SupportTicket} from '../../../core/models/support-ticket';
import {tick} from '@angular/core/testing';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  isSubmitting = false;
  details = '';

  constructor(private supportService: SupportService,
              private authService: AuthenticationService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.isSubmitting = true;

    setTimeout(() => {
      const ticket = new SupportTicket();
      ticket.email = this.authService.currentUserValue.email;
      ticket.name = this.authService.currentUserValue.firstName + ' ' + this.authService.currentUserValue.lastName;
      ticket.details = this.details;

      this.supportService.createTicket(ticket)
        .subscribe(res => {
          if (res) {
            this.isSubmitting = false;
            this.snackBar.open('Submitted please check your email', undefined, {
              duration: 5000
            });
          }
        }, error => {
          this.snackBar.open('Unexpected Error Occurred!', undefined, {
            duration: 5000
          });
        });
    }, 1000);
  }
}
