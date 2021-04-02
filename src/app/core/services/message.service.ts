import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageRequest} from '../models/message-request';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Message} from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {
  }

  sendMessage(messageRequest: MessageRequest): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/messages/new`, messageRequest);
  }

  fetchMessages(role: string, fromId: number, toId: number): Observable<any>{
    return this.http
      .get(`${environment.apiUrl}/messages/${role.toLowerCase()}/${fromId}/${toId}`);
  }
}
