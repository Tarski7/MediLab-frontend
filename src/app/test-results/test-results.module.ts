import { RouterModule } from '@angular/router';
import { EditTestResultResolverService } from './services/edit-test-result-resolver.service';
import { TestResultService } from './services/test-result.service';
import { TestResultListingComponent } from './components/test-result-listing/test-result-listing.component';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestResultFormComponent } from './components/test-result-form/test-result-form.component';
import { TestResultViewComponent } from './components/test-result-view/test-result-view.component';

@NgModule({
  declarations: [
    TestResultListingComponent,
    TestResultFormComponent,
    TestResultViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    TestResultListingComponent,
    TestResultFormComponent
  ],
  providers: [
    TestResultService,
    EditTestResultResolverService
  ]
})
export class TestResultsModule { }
