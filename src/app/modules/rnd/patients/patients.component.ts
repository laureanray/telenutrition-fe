import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {AppointmentService} from '../../../core/services/appointment.service';
import {Appointment} from '../../../core/models/appointment';
import {Patient} from '../../../core/models/patient';
import * as moment from 'moment';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  appointments: Appointment[];
  archivedAppointments: Appointment[];
  searchString: any;
  patients: any[];
  patientsResult: Patient[];
  isShowingPatientDetails = false;
  JSON = JSON;
  patientSelected: Patient;
  moment = moment;

  constructor(private authService: AuthenticationService,
              private appointmentService: AppointmentService) {
    this.appointmentService.getAllAppointmentsByRND(this.authService.currentUserValue.id)
      .subscribe(res => {
        if (res) {
          this.appointments = res;
          this.patients = this.appointments.map(a => a.patient);
          this.patients = this.patients.map(a => JSON.stringify(a));
          this.patients = [...new Set(this.patients)];
          this.patients = this.patients.map(a => JSON.parse(a));
        }
      });


  }

  ngOnInit(): void {
  }

  update(): void {
    console.log(this.patients);
    if (this.searchString) {
      this.patientsResult = this.patients.filter(p => {
        console.log(p.firstName, this.searchString);
        return p.firstName.toUpperCase().includes(this.searchString.toUpperCase());
      });
    }
  }

  showPatientDetails(patient: Patient): void {
    this.isShowingPatientDetails = true;
    this.patientSelected = patient;
  }

  back(): void {
    this.isShowingPatientDetails = false;
    this.patientSelected = undefined;
  }
}
