import {Component, OnInit} from '@angular/core';
import {RND} from '../../../core/models/rnd';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {RndService} from '../../../core/services/rnd.service';
import * as moment from 'moment';
import {Appointment} from '../../../core/models/appointment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rnd: RND;
  upcoming = 0;
  moment: any;
  today = moment();
  constructor(private authService: AuthenticationService,
              private rndService: RndService) {
    this.moment = moment;
    this.rndService.getRND(this.authService.currentUserValue.username)
      .subscribe(curr => {
        if (curr) {
          this.rnd = curr as RND;

          // tslint:disable-next-line:forin
          for (const appointment of  this.rnd.appointments as Appointment[]) {
            if (this.today.isSame(moment(appointment.schedule), 'hour')) {
              this.upcoming++;
            }
          }

          this.sortAndFilterAppointments();
        }
      });
  }

  sortAndFilterAppointments(): void {
    this.rnd.appointments = this.rnd.appointments
      .sort((a, b) => {
          if (a.schedule > b.schedule) {
            return 1;
          } else if (a.schedule < b.schedule) {
            return -1;
          } else {
            return 0;
          }
      });

    const res = this.rnd.appointments = this.rnd.appointments.filter(appointment => {
      return moment(appointment.schedule).isAfter();
    });

    // this.upcoming = res.length;
  }

  ngOnInit(): void {
  }

}
