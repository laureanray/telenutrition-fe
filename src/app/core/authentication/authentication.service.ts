import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {Patient} from '../models/patient';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {PatientService} from '../services/patient.service';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import jwt_decode from 'jwt-decode';
import {RND} from '../models/rnd';
import {Admin} from '../models/admin';
import {AdminService} from '../services/admin.service';
import {RndService} from '../services/rnd.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Patient|RND|Admin>;
  public currentUser: Observable<Patient|RND|Admin>;
  private httpOptions: { headers: HttpHeaders };
  public isLoggedIn: boolean;
  constructor(
    private http: HttpClient,
    private patientService: PatientService,
    private adminService: AdminService,
    private rndService: RndService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  // resetPassword(username: string) {
  //   this.http.post
  // }

  // tslint:disable-next-line:typedef
  login(username: string, password: string) {
    // retuarn this.http
    //   .post(`${environment.apiUrl}/student/auth`, { uniqueIdentifier: studentNumber, password})
    //   .pipe(map(response => {
    //     // console.log(response);
    //     let patient = new Patient();
    //     patient.role = 'Student';
    //     this.currentUserSubject.next(patient);
    //     patient = _.merge(patient, response);
    //     localStorage.setItem('currentUser', JSON.stringify(patient));
    //     return patient;
    //   }));

    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa('WEB_CLIENT:SECRET'),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.post<any>(`${environment.apiRoot}/oauth/token`, body.toString(), this.httpOptions)
      .pipe(map(response => {
        // Check the role first
        const token = response.access_token;
        const tokenInfo = this.getDecodedAccessToken(token);

        switch (tokenInfo.authorities[0]) {
          case 'ROLE_RND':
            let rnd = new RND();
            // // Set token so we can access the endpoints
            rnd.token = token;
            rnd.roleName = tokenInfo.authorities[0];
            rnd.readableRole = 'Nutritionist-Dietitian';
            rnd.username = username;
            // // Make this the current user
            this.currentUserSubject.next(rnd);
            this.rndService.getRND(username)
              .subscribe((data: RND) => {
                rnd = _.merge(rnd, data);
                localStorage.setItem('currentUser', JSON.stringify(rnd));
              });
            break;
          case 'ROLE_PATIENT':
            let patient = new Patient();
            // // Set token so we can access the endpointsasldkawsldk
            patient.token = token;
            patient.roleName = tokenInfo.authorities[0];
            patient.readableRole = 'Patient';
            patient.username = username;
            this.currentUserSubject.next(patient);
            this.patientService.getPatient(username)
              .subscribe((data: Patient) => {
                patient = _.merge(patient, data);
                localStorage.setItem('currentUser', JSON.stringify(patient));
                this.currentUserSubject.next(patient);
                console.log('ov set', patient);
              });

            break;
          case 'ROLE_ADMIN':
            let admin = new Admin();
            admin.token = token;
            admin.roleName = tokenInfo.authorities[0];
            admin.readableRole = 'Admin';
            admin.username = username;
            this.currentUserSubject.next(admin);
            this.adminService.getAdmin(username)
              .subscribe((data: Admin) => {
                admin = _.merge(admin, data);
                localStorage.setItem('currentUser', JSON.stringify(admin));
                console.log(admin);
              });
            break;
          default: return;
        }

        return tokenInfo.authorities[0];
      }));
  }

  // adminLogin(username: string, password: string) {
  //   return this.http
  //     .post(`${environment.apiUrl}/admin/auth`, { uniqueIdentifier: username, password})
  //     .pipe(map(response => {
  //     }));
  // }

  // instructorLogin(username: string, password: string) {
  //   return this.http
  //     .post(`${environment.apiUrl}/instructor/auth`, { uniqueIdentifier: username, password})
  //     .pipe(map((response: Response) => {
  //
  //       if (response.type === 'Instructor') {
  //         let instructor = new Instructor();
  //         instructor.role = response.type;
  //         instructor = _.merge(instructor, response.instructor);
  //         this.currentUserSubject.next(instructor);
  //         localStorage.setItem('currentUser', JSON.stringify(instructor));
  //       } else {
  //         let admin = new Admin();
  //         admin.role = response.type;
  //         admin = _.merge(admin, response.admin);
  //         this.currentUserSubject.next(admin);
  //         localStorage.setItem('currentUser', JSON.stringify(admin));
  //       }
  //
  //       return response;
  //     }));
  // }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): Patient|Admin|RND {
    // console.log(this.currentUserSubject.getValue());
    return this.currentUserSubject.getValue();
  }

  public updateUser(user: Patient|Admin|RND): void {
    const updated = _.merge(this.currentUserValue, user);
    this.currentUserSubject.next(updated);
    localStorage.setItem('currentUser', JSON.stringify(updated));
    console.log('updateUser()', updated);
  }
}
