import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatientComponent} from './patient/patient.component';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PatientRoutingModule} from './patient-routing.module';
import {ButtonBarComponent} from './button-bar/button-bar.component';
import {ConsultationComponent} from './consultation/consultation.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {SupportComponent} from './support/support.component';
import {MedicalRecordsComponent} from './medical-records/medical-records.component';
import {HistoryComponent} from './history/history.component';
import {BookComponent} from './book/book.component';
import {NutritionToolsComponent} from './nutrition-tools/nutrition-tools.component';
import {BookAnAppointmentComponent} from './book-an-appointment/book-an-appointment.component';
import {UserCardComponent} from './user-card/user-card.component';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {SharedModule} from '../../core/shared/shared.module';
import {AppointmentsComponent} from './appointments/appointments.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {ViewAppointmentComponent} from './view-appointment/view-appointment.component';


@NgModule({
  declarations: [
    PatientComponent,
    DashboardComponent,
    ButtonBarComponent,
    ConsultationComponent,
    AccountSettingsComponent,
    SupportComponent,
    MedicalRecordsComponent,
    HistoryComponent,
    BookComponent,
    NutritionToolsComponent,
    BookAnAppointmentComponent,
    UserCardComponent,
    AppointmentsComponent,
    ViewAppointmentComponent],
  imports: [
    CommonModule,
    RouterModule,
    PatientRoutingModule,
    MatButtonModule,
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
    MatSortModule
  ],
  bootstrap: [PatientComponent]
})
export class PatientModule {
}
