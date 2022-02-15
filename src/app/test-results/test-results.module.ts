import { TestResultListingComponent } from './components/test-result-listing/test-result-listing.component';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TestResultListingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    TestResultListingComponent
  ]
})
export class TestResultsModule { }
