import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Appointment} from '../models/appointment';
import {environment} from '../../../environments/environment';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {Observable} from 'rxjs';
import {ProofOfPayment} from '../models/proof-of-payment';

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

  getAllActiveAppointments(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/appointments/active`);
  }

  getAllArchivedAppointments(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/appointments/archived`);
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/appointments/${id}`);
  }

  getArchivedAppointmentsByPatient(id: number): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/appointments/patient-archived/${id}`);
  }

  getActiveAppointmentsByPatient(id: number): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/appointments/patient-active/${id}`);
  }

  addProofOfPayment(id: number, appointment: Appointment): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/appointments/upload/${id}`, appointment);
  }

  updateAppointment(appointment: Appointment): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/appointments/update`, appointment);
  }
}
