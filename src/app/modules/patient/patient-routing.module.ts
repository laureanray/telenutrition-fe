import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PatientComponent} from './patient/patient.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ConsultationComponent} from './consultation/consultation.component';
import {MedicalRecordsComponent} from './medical-records/medical-records.component';
import {SupportComponent} from './support/support.component';
import {HistoryComponent} from './history/history.component';
import {BookAnAppointmentComponent} from './book-an-appointment/book-an-appointment.component';
import {NutritionToolsComponent} from './nutrition-tools/nutrition-tools.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {AppointmentsComponent} from './appointments/appointments.component';
import {ViewAppointmentComponent} from './view-appointment/view-appointment.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: '', component: PatientComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      // {path: 'consultation', component: ConsultationComponent, pathMatch: 'full'},
      {path: 'appointments', component: AppointmentsComponent, pathMatch: 'full'},
      { path: 'appointments/view/:id', component: ViewAppointmentComponent, pathMatch: 'full'},
      {path: 'account-settings', component: AccountSettingsComponent, pathMatch: 'full'},
      {path: 'medical-records', component: MedicalRecordsComponent, pathMatch: 'full'},
      {path: 'support', component: SupportComponent, pathMatch: 'full'},
      {path: 'history', component: HistoryComponent, pathMatch: 'full'},
      {path: 'book-an-appointment', component: BookAnAppointmentComponent, pathMatch: 'full'},
      {path: 'nutrition-tools', component: NutritionToolsComponent, pathMatch: 'full'}
    ]
  },
];


@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule
  ],
  exports: [RouterModule]
})

export class PatientRoutingModule {
}
