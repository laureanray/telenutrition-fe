import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Appointment} from '../models/appointment';
import {environment} from '../../../environments/environment';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) {
  }

  createAppointment(appointment: Appointment): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/appointments/new`, appointment);
  }
}
