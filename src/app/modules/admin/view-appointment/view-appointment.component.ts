import {Component, OnInit} from '@angular/core';
import {Appointment} from '../../../core/models/appointment';
import {ActivatedRoute} from '@angular/router';
import {AppointmentService} from '../../../core/services/appointment.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {LogoutModalComponent} from '../../../core/shared/logout-modal/logout-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ChangeStatusComponent} from '../change-status/change-status.component';
import {AssignRndModalComponent} from '../assign-rnd-modal/assign-rnd-modal.component';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss']
})
export class ViewAppointmentComponent implements OnInit {
  appointment: Appointment;
  moment: any;
  environment: any;
  id: number;

  constructor(private route: ActivatedRoute,
              private appointmentService: AppointmentService,
              private dialog: MatDialog) {
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
    this.id = parseInt(routeParams.get('id'));
    this.fetchCurrentAppointment(this.id);
  }

  changeStatus(): void {
    const ref = this.dialog.open(ChangeStatusComponent, {
      width: '520px',
      data: {
        appointment: this.appointment
      }
    });


    ref.afterClosed().subscribe(afterClosed => {
      this.fetchCurrentAppointment(this.id);
    });
  }

  assignRND(): void {
    const ref = this.dialog.open(AssignRndModalComponent, {
      width: '520px',
      data: {
        appointment: this.appointment
      }
    });


    ref.afterClosed().subscribe(afterClosed => {
      this.fetchCurrentAppointment(this.id);
    });
  }
}
