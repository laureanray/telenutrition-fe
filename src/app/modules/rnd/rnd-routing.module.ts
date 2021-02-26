import {RouterModule, Routes} from '@angular/router';
import {PatientComponent} from '../patient/patient/patient.component';
import {DashboardComponent} from '../patient/dashboard/dashboard.component';
import {ConsultationComponent} from '../patient/consultation/consultation.component';
import {AccountSettingsComponent} from '../patient/account-settings/account-settings.component';
import {MedicalRecordsComponent} from '../patient/medical-records/medical-records.component';
import {SupportComponent} from '../patient/support/support.component';
import {HistoryComponent} from '../patient/history/history.component';
import {BookAnAppointmentComponent} from '../patient/book-an-appointment/book-an-appointment.component';
import {NutritionToolsComponent} from '../patient/nutrition-tools/nutrition-tools.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: '', component: PatientComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      {path: 'consultation', component: ConsultationComponent, pathMatch: 'full'},
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

export class RndRoutingModule {
}
