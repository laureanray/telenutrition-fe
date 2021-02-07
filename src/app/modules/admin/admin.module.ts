import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AdminRoutingModule} from './admin-routing.module';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import {MatButtonModule} from '@angular/material/button';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ConfigComponent } from './config/config.component';
import { SiteSettingsComponent } from './site-settings/site-settings.component';



@NgModule({
  declarations: [AdminComponent, DashboardComponent, AdminNavComponent, AccountManagementComponent, ConfigComponent, SiteSettingsComponent],
  exports: [
    AdminNavComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule
  ]
})
export class AdminModule { }
