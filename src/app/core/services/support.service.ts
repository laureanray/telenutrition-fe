import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SupportTicket} from '../models/support-ticket';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private http: HttpClient) {
  }

  createTicket(ticket: SupportTicket): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/ticket/new`, ticket);
  }

  getTickets(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/ticket`);
  }

  getTicketsByStatus(status: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/ticket/status/${status}`);
  }

  updateTicket(ticket: SupportTicket): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/ticket/update`, ticket);
  }
}
