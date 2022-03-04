import { TestResultService } from './services/test-result.service';
import { TestResultListingComponent } from './components/test-result-listing/test-result-listing.component';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TestResultFormComponent } from './components/test-result-form/test-result-form.component';

@NgModule({
  declarations: [
    TestResultListingComponent,
    TestResultFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    TestResultListingComponent,
    TestResultFormComponent
  ],
  providers: [
    TestResultService
  ]
})
export class TestResultsModule { }
