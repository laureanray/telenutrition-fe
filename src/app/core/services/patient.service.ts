import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Patient} from '../models/patient';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  registerPatient(patient: Patient): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/patients/register`, patient);
  }

  updatePatientInformation(patient: Patient): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/patients/update`, patient);
  }

  updatePhoto(patient: Patient): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/patients/updatePhoto`, patient);
  }

  getPatient(username: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/patients/find/${username}`);
  }

  getAllPatients(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/patients`);
  }

  updateAccount(patient: Patient): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/patients/update-account/${patient.username}`, patient);
  }
}
