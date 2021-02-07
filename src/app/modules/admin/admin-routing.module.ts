import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountManagementComponent} from './account-management/account-management.component';
import {ConfigComponent} from './config/config.component';
import {SiteSettingsComponent} from './site-settings/site-settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: 'account', component: AccountManagementComponent, pathMatch: 'full' },
      { path: 'config', component: ConfigComponent, pathMatch: 'full' },
      { path: 'site', component: SiteSettingsComponent, pathMatch: 'full' },
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

export class AdminRoutingModule { }
