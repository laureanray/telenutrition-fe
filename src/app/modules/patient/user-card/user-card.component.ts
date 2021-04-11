import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {User} from '../../../core/models/user';
import {Patient} from '../../../core/models/patient';
import {RND} from '../../../core/models/rnd';
import {Admin} from '../../../core/models/admin';
import {PatientService} from '../../../core/services/patient.service';
import {Subscription} from 'rxjs';
import {AppointmentService} from '../../../core/services/appointment.service';
import {Appointment} from '../../../core/models/appointment';
import * as moment from 'moment';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, OnDestroy {
  public patient: Patient;
  patientS: Subscription;
  appointmentS: Subscription;
  moment: any;
  public appointments: Appointment[];

  constructor(private authService: AuthenticationService,
              private patientService: PatientService,
              private appointmentService: AppointmentService) {
    this.patientS = this.patientService.getPatient(this.authService.currentUserValue.username)
      .subscribe((p: Patient) => {
        this.patient = p;
        console.log(this.patient.medicalRecord);
      });

    this.moment = moment;

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

  ngOnDestroy(): void {
    this.patientS.unsubscribe();
  }
}
