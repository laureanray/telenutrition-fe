import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {WebSocketAPI} from '../../../core/utils/websocket-api';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  sub: Subscription;
  webSocketAPI: WebSocketAPI;

  constructor() {
  }

  ngOnInit(): void {
    this.webSocketAPI = new WebSocketAPI(new MessagesComponent());
  }

  connect(): void{
    this.webSocketAPI._connect();
  }

  disconnect(): void{
    this.webSocketAPI._disconnect();
  }

  sendMessage(): void{
    this.webSocketAPI._send('hallos');
  }

  handleMessage(message: any): void {
    console.log(message);
  }

}
