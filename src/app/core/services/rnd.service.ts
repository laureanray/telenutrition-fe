import { Injectable } from '@angular/core';
import {RND} from '../models/rnd';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RndService {

  constructor(private http: HttpClient) { }

  registerRND(rnd: RND): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/rnd/register`, rnd);
  }

  updateRNDInformation(rnd: RND): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/rnd/update`, rnd);
  }

  addFile(id: number, pathToAdd: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/rnd/addFile/${id}/`, { path: pathToAdd });
  }

  getRND(username: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/rnd/find/${username}`);
  }

  getAllRnds(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/rnd`);
  }
}
