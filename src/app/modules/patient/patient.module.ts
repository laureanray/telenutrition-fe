import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient/patient.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [PatientComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  bootstrap: [PatientComponent]
})
export class PatientModule { }
