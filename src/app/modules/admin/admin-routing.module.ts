import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountManagementComponent} from './account-management/account-management.component';
import {ConfigComponent} from './config/config.component';
import {SiteSettingsComponent} from './site-settings/site-settings.component';
import {ViewRndComponent} from './view-rnd/view-rnd.component';
import {ViewPatientComponent} from './view-patient/view-patient.component';
import {AppointmentsComponent} from './appointments/appointments.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: 'account', component: AccountManagementComponent, pathMatch: 'full' },
      { path: 'appointments', component: AppointmentsComponent, pathMatch: 'full'},
      { path: 'config', component: ConfigComponent, pathMatch: 'full' },
      { path: 'site', component: SiteSettingsComponent, pathMatch: 'full' },
      { path: 'account/view/rnd/:username', component: ViewRndComponent, pathMatch: 'full'},
      { path: 'account/view/patient/:username', component: ViewPatientComponent, pathMatch: 'full'}
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

export class AdminRoutingModule { }
