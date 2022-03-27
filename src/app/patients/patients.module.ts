import { PatientFormDialogComponent } from './components/patient-form-dialog/patient-form-dialog.component';
import { PatientService } from './services/patient.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListingComponent } from './components/patient-listing/patient-listing.component';

@NgModule({
  declarations: [
    PatientListingComponent,
    PatientFormDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    PatientListingComponent
  ],
  providers: [
    PatientService
  ]
})
export class PatientsModule { }
