import { Injectable } from '@angular/core';
import {Patient} from '../models/patient';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  // updatePatientInformation(patient: Patient): Observable<any> {
  //   return this.http
  //     .post(`${environment.apiUrl}/patients/update`, patient);
  // }

  getAdmin(username: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/admin/find/${username}`);
  }
}
