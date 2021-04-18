import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {AppointmentService} from '../../../core/services/appointment.service';
import {Appointment} from '../../../core/models/appointment';
import {Patient} from '../../../core/models/patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  appointments: Appointment[];
  searchString: any;
  patients: Patient[];
  patientsResult: Patient[];

  constructor(private authService: AuthenticationService,
              private appointmentService: AppointmentService) {
    this.appointmentService.getActiveAppointmentsByRND(this.authService.currentUserValue.id)
      .subscribe(res => {
        if (res) {
          this.appointments = res;
          this.patients = this.appointments.map(a => a.patient);
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
        return p.firstName.includes(this.searchString);
      });
    }
  }
}
