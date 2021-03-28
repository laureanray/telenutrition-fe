import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from '../../../core/services/message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  sub: Subscription;
  constructor(private messageService: MessageService) {

  }


  ngOnInit(): void {
  }


}
