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
}