import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin/admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminNavComponent} from './admin-nav/admin-nav.component';
import {MatButtonModule} from '@angular/material/button';
import {AccountManagementComponent} from './account-management/account-management.component';
import {ConfigComponent} from './config/config.component';
import {SiteSettingsComponent} from './site-settings/site-settings.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {UsersTableComponent} from './users-table/users-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AdminComponent, DashboardComponent, AdminNavComponent, AccountManagementComponent, ConfigComponent, SiteSettingsComponent, UsersTableComponent, UsersTableComponent],
  exports: [
    AdminNavComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class AdminModule {
}
