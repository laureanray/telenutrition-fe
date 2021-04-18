import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Patient} from '../../../core/models/patient';
import {RND} from '../../../core/models/rnd';
import {Appointment} from '../../../core/models/appointment';
import {Subscription} from 'rxjs';
import {AppointmentService} from '../../../core/services/appointment.service';
import * as moment from 'moment';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  public rnd: RND;
  public appointments: Appointment[];
  moment = moment;
  appointmentS: Subscription;
  constructor(private authService: AuthenticationService,
              private appointmentService: AppointmentService) {
    this.rnd = this.authService.currentUserValue as RND;

    this.appointmentS = this.appointmentService.getArchivedAppointmentsByPatient(this.authService.currentUserValue.id)
      .subscribe((ap: Appointment[]) => {
        this.appointments = ap;
        for (const a of this.appointments) {
          switch (a.appointmentType) {
            case 'one_week_cycle_menu':
              a.appointmentType = 'One Week Cycle Menu';
              break;
            case 'both':
              a.appointmentType = 'One Week Cycle Menu + Nutrition Counseling';
              break;
            case 'nutrition_counseling':
              a.appointmentType = 'Nutrition Counseling';
          }
        }
      });
  }

  ngOnInit(): void {
  }


}
