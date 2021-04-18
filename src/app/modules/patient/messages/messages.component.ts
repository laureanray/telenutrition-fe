import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from '../../../core/services/message.service';
import {Appointment} from '../../../core/models/appointment';
import {Patient} from '../../../core/models/patient';
import {Message} from '../../../core/models/message';
import {RndService} from '../../../core/services/rnd.service';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MessageRequest} from '../../../core/models/message-request';
import {RND} from '../../../core/models/rnd';
import {PatientService} from '../../../core/services/patient.service';
import * as moment from 'moment';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  appointments: Appointment[];
  selectedRND: RND;
  message: string;
  messages: Message[];
  isSendingMessage = false;
  intervalRef: any;
  moment: any;

  constructor(private authService: AuthenticationService,
              private messageService: MessageService,
              private patientService: PatientService,
              private snackBar: MatSnackBar) {
    this.moment = moment;
    this.patientService.getPatient(this.authService.currentUserValue.username)
      .subscribe(res => {
        if (res) {
          this.appointments = res.appointments;
          console.log(this.appointments);
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
    that.messageService.fetchMessages('patient', that.selectedRND.id, that.authService.currentUserValue.id)
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
      // that.scrollToBottom();
    }, 500);
  }

  ngOnInit(): void {
  }

  selectRND(rnd: RND): void {
    console.log(rnd);

    this.selectedRND = rnd;
    this.updateMessage(this);
    this.startInterval();
    this.scrollToBottom();
  }

  sendMessage(): void {
    this.isSendingMessage = true;
    const mr = new MessageRequest();
    mr.message = this.message;
    mr.rndId = this.selectedRND.id;
    mr.patientId = this.authService.currentUserValue.id;
    mr.sender = 'patient';
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
