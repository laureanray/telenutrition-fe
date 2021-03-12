import {Component, OnInit} from '@angular/core';
import {Appointment} from '../../../core/models/appointment';
import {ActivatedRoute} from '@angular/router';
import {AppointmentService} from '../../../core/services/appointment.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss']
})
export class ViewAppointmentComponent implements OnInit {
  appointment: Appointment;
  moment: any;
  environment: any;

  constructor(private route: ActivatedRoute,
              private appointmentService: AppointmentService) {
    this.moment = moment;
    this.environment = environment;
  }

  fetchCurrentAppointment(id: number): void {
    this.appointmentService.getAppointmentById(id)
      .subscribe(res => {
        this.appointment = res as Appointment;
        console.log(this.appointment);
      }, error => {
        alert(error);
      });
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    // tslint:disable-next-line:radix
    const id = parseInt(routeParams.get('id'));
    this.fetchCurrentAppointment(id);
  }

}
