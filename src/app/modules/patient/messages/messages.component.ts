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
import {Word} from '../../../core/models/word';


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
        if (!that.messages) {
          that.messages = res as Message[];
          that.parseMessages();
        } else if (that.messages.length !== res.length) {
          that.messages = res as Message[];
          that.parseMessages();
        } else {
          that.parseMessages();
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


  parseMessages(): void {
    const patt = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi;
    for (const m of this.messages) {
      const w = m.message.split(' ');
      m.words = [];
      for (let word of w) {
        word = word.trim();
        console.log(word.match(patt), word);
        if (word.match(patt)) {
          m.words.push({
            word,
            isLink: true
          } as Word);
        } else {
          m.words.push({
            word,
            isLink: false
          } as Word);
        }
      }
    }

    console.log(this.messages);
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
