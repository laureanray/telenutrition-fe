import { Component, OnInit } from '@angular/core';
import {RND} from '../../../core/models/rnd';
import {Patient} from '../../../core/models/patient';
import {Appointment} from '../../../core/models/appointment';
import {PatientService} from '../../../core/services/patient.service';
import {RndService} from '../../../core/services/rnd.service';
import {AdminService} from '../../../core/services/admin.service';
import {Observable} from 'rxjs';
import {AppointmentService} from '../../../core/services/appointment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rnds: Observable<Appointment[]>;
  patients: Observable<Patient[]>;
  appointments: Observable<Appointment[]>;


  constructor(private patientService: PatientService,
              private rndService: RndService,
              private adminService: AdminService,
              private appointmentService: AppointmentService) {
    this.patients = this.patientService.getAllPatients();
    this.appointments = this.appointmentService.getAllActiveAppointments();
    this.rnds = this.rndService.getAllRnds();
  }

  ngOnInit(): void {
    console.log('test');
  }

}
