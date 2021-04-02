import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PatientService} from '../../../core/services/patient.service';
import {Subscription} from 'rxjs';
import {Patient} from '../../../core/models/patient';
import {AppointmentService} from '../../../core/services/appointment.service';
import {Appointment} from '../../../core/models/appointment';
import {environment} from 'src/environments/environment';
import {UpdateAmountModalComponent} from '../../admin/update-amount-modal/update-amount-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss']
})
export class ViewAppointmentComponent implements OnInit, OnDestroy {
  id = undefined;
  appointmentServiceS: Subscription;
  patient: Patient;
  appointment: Appointment;
  environment: any;

  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private appointmentService: AppointmentService,
              private dialog: MatDialog) {
    this.environment = environment;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = parseInt(routeParams.get('id'), 10);
    this.fetchCurrentAppointment(this.id);
  }

  fetchCurrentAppointment(id: number): void {
    this.appointmentServiceS = this.appointmentService.getAppointmentById(parseInt(this.id, 10))
      .subscribe((appointment: Appointment) => {
        this.appointment = appointment;
      });
  }

  ngOnDestroy(): void {
    this.appointmentServiceS.unsubscribe();
  }

  stringify(data: any): any {
    return JSON.stringify(data);
  }

  updateAmount(): void {
    const ref = this.dialog.open(UpdateAmountModalComponent, {
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
