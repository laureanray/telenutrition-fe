import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RndService} from '../../../core/services/rnd.service';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {RND} from '../../../core/models/rnd';
import {CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput, FullCalendarComponent} from '@fullcalendar/angular';
import {INITIAL_EVENTS, createEventId} from '../../../core/utils/event-utils';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  rnd: RND;
  calendarVisible = true;
  currentEvents: EventApi[] = [];


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    initialEvents: []
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)
  };

  handleCalendarToggle(): void {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle(): void {
    const {calendarOptions} = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleEventClick(clickInfo: EventClickArg): void {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]): void {
    this.currentEvents = events;
  }

  constructor(private rndService: RndService,
              private authService: AuthenticationService) {
    this.rnd = this.authService.currentUserValue as RND;
    console.log(this.rnd);
  }


  initEvents(): void {
    const appointments = this.rnd.appointments;
    const calendar =  this.calendarComponent.getApi();
    if (appointments.length > 0) {
      for (const appointment of appointments) {
       calendar.addEvent({
          id: createEventId(),
          title: `Appointment with ${appointment.patient.firstName}`,
          start: moment(appointment.schedule).toISOString()
        } as EventInput);
      }
    }

  }

  ngAfterViewInit(): void {
    this.initEvents();
  }

}
