import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RndComponent} from './rnd/rnd.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PatientsComponent} from './patients/patients.component';
import {CalendarComponent} from './calendar/calendar.component';
import {AppointmentsComponent} from './appointments/appointments.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {ViewAppointmentComponent} from './view-patient/view-appointment.component';
import {MessagesComponent} from './messages/messages.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: '', component: RndComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      {path: 'account-settings', component: AccountSettingsComponent, pathMatch: 'full'},
      {path: 'appointments', component: AppointmentsComponent, pathMatch: 'full' },
      {path: 'messages', component: MessagesComponent, pathMatch: 'full' },
      {path: 'messages/:id', component: MessagesComponent, pathMatch: 'full'},
      {path: 'appointment/:id', component: AppointmentComponent, pathMatch: 'full'},
      {path: 'appointments/:optional', component: AppointmentsComponent, pathMatch: 'full'},
      {path: 'view-appointment/:id', component: ViewAppointmentComponent, pathMatch: 'full'},
      {path: 'patients', component: PatientsComponent, pathMatch: 'full'},
      {path: 'calendar', component: CalendarComponent, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule
  ],
  exports: [RouterModule]
})

export class RndRoutingModule {
}
