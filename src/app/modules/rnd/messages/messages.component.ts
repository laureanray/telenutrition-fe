import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RndService} from '../../../core/services/rnd.service';
import {Appointment} from '../../../core/models/appointment';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Patient} from '../../../core/models/patient';
import {MessageService} from '../../../core/services/message.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Message} from '../../../core/models/message';
import {MessageRequest} from '../../../core/models/message-request';
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  appointments: Appointment[];
  selectedPatient: Patient;
  message: string;
  messages: Message[];
  isSendingMessage = false;
  intervalRef: any;
  moment: any;
  constructor(private rndService: RndService,
              private authService: AuthenticationService,
              private messageService: MessageService,
              private snackBar: MatSnackBar) {
    this.moment = moment;
    this.rndService.getRND(this.authService.currentUserValue.username)
      .subscribe(res => {
        if (res) {
          this.appointments = res.appointments;
          this.scrollToBottom();
        }
      });
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight + 100;
    } catch (err) {
      console.log(err);
    }
  }

  updateMessage(that: any): void {
    that.messageService.fetchMessages('rnd', that.authService.currentUserValue.id, that.selectedPatient.id)
      .subscribe(res => {
        if (res) {
          that.messages = res as Message[];
        }
      }, error => {
        that.snackBar.open('Error', undefined, {
          duration: 3000
        });
      });
  }

  startInterval(): void {
    const that = this;
    this.intervalRef = setInterval(() => {
      that.updateMessage(that);
      that.scrollToBottom();
    }, 500);
  }

  ngOnInit(): void {
  }

  selectPatient(patient: Patient): void {
    console.log(patient);

    this.selectedPatient = patient;
    this.updateMessage(this);
    this.startInterval();
    this.scrollToBottom();
  }

  sendMessage(): void {
    this.isSendingMessage = true;
    const mr = new MessageRequest();
    mr.message = this.message;
    mr.patientId = this.selectedPatient.id;
    mr.rndId = this.authService.currentUserValue.id;
    mr.sender = 'rnd';
    this.messageService.sendMessage(mr)
      .subscribe(res => {
        if (res) {
          console.log(res);
          this.updateMessage(this);
          this.message = null;
        }
      }, error => {
        this.snackBar.open('Error sending message', undefined, {
          duration: 3000
        });
      });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalRef);
  }
}
