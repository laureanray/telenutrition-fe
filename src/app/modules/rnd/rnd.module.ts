import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RndComponent} from './rnd/rnd.component';
import {RndNavComponent} from './rnd-nav/rnd-nav.component';
import {RndRoutingModule} from './rnd-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserCardComponent} from './user-card/user-card.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SharedModule} from '../../core/shared/shared.module';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {PatientsComponent} from './patients/patients.component';
import {CalendarComponent} from './calendar/calendar.component';
import {FullCalendarModule} from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import {AppointmentsComponent} from './appointments/appointments.component';
import {AppointmentComponent} from './appointment/appointment.component';
import { ViewAppointmentComponent } from './view-patient/view-appointment.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MessagesComponent } from './messages/messages.component'; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [RndComponent, RndNavComponent, DashboardComponent, UserCardComponent, AccountSettingsComponent, PatientsComponent, CalendarComponent, AppointmentsComponent, AppointmentComponent, ViewAppointmentComponent, MessagesComponent],
    imports: [
        CommonModule,
        RndRoutingModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatOptionModule,
        MatSelectModule,
        MatSnackBarModule,
        SharedModule,
        MatSortModule,
        MatButtonModule,
        FullCalendarModule,
        MatTabsModule,
        FormsModule
    ]
})
export class RndModule {
}
