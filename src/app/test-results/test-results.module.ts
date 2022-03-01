import { TestResultService } from './services/test-result.service';
import { TestResultListingComponent } from './components/test-result-listing/test-result-listing.component';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    TestResultListingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    TestResultListingComponent
  ],
  providers: [
    TestResultService
  ]
})
export class TestResultsModule { }
