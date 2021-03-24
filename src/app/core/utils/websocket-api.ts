import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MessagesComponent} from '../../modules/patient/messages/messages.component';


export class WebSocketAPI {
  webSocketEndPoint = 'http://localhost:8080/gs-guide-weboscket/';
  topic = '/topic/greetings';
  stompClient: any;
  messageComponent: MessagesComponent;
  constructor(messageComponent: MessagesComponent){
    this.messageComponent = messageComponent;
    this._connect();
  }
  // tslint:disable-next-line:typedef
  _connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    // tslint:disable-next-line:variable-name
    const _this = this;
    _this.stompClient.connect({}, (frame) => {
      _this.stompClient.subscribe(_this.topic, (sdkEvent) => {
        _this.onMessageReceived(sdkEvent);
      });
      // _this.stompClient.reconnect_delay = 2000;
    }, error => {
      _this.errorCallBack(error, _this);
    });
  }

  // tslint:disable-next-line:typedef
  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error, that): void{
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      that._connect();
    }, 5000);
  }

  _send(message): void {
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/hello', {}, JSON.stringify(message));
  }

  // tslint:disable-next-line:typedef
  onMessageReceived(message) {
    console.log('Message Recieved from Server :: ' + message);
    this.messageComponent.handleMessage(JSON.stringify(message.body));
  }
}
