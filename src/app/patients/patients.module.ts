import { MaterialModule } from './../shared/material.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListingComponent } from './components/patient-listing/patient-listing.component';



@NgModule({
  declarations: [
    PatientListingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    PatientListingComponent
  ]
})
export class PatientsModule { }
