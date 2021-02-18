import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient/patient.component';
import {RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PatientRoutingModule} from './patient-routing.module';
import { ButtonBarComponent } from './button-bar/button-bar.component';



@NgModule({
  declarations: [PatientComponent, DashboardComponent, ButtonBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    PatientRoutingModule
  ],
  bootstrap: [PatientComponent]
})
export class PatientModule { }
