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
import {ViewRndComponent} from './view-rnd/view-rnd.component';
import {ViewPatientComponent} from './view-patient/view-patient.component';
import {ApproveRndModalComponent} from './approve-rnd-modal/approve-rnd-modal.component';
import {AppointmentsComponent} from './appointments/appointments.component';
import {ViewAppointmentComponent} from './view-appointment/view-appointment.component';
import {ChangeStatusComponent} from './change-status/change-status.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AssignRndModalComponent } from './assign-rnd-modal/assign-rnd-modal.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { UpdateAmountModalComponent } from './update-amount-modal/update-amount-modal.component';
import {MatInputModule} from '@angular/material/input';
import { NutritionToolsComponent } from './nutrition-tools/nutrition-tools.component';
import { SupportComponent } from './support/support.component';
import { MarkResolvedModalComponent } from './mark-resolved-modal/mark-resolved-modal.component';
import { AddNutritionToolComponent } from './add-nutrition-tool/add-nutrition-tool.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AdminComponent, DashboardComponent, AdminNavComponent, AccountManagementComponent, ConfigComponent, SiteSettingsComponent, UsersTableComponent, UsersTableComponent, ViewRndComponent, ViewPatientComponent, ApproveRndModalComponent, AppointmentsComponent, ViewAppointmentComponent, ChangeStatusComponent, AssignRndModalComponent, UpdateAmountModalComponent, NutritionToolsComponent, SupportComponent, MarkResolvedModalComponent, AddNutritionToolComponent, DeleteModalComponent],
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
        MatPaginatorModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        FormsModule,
        MatDialogModule,
        NgxMatSelectSearchModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})
export class AdminModule {
}
