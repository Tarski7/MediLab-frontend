import { TestResultFormComponent } from './../test-results/components/test-result-form/test-result-form.component';
import { PatientListingComponent } from './../patients/components/patient-listing/patient-listing.component';
import { TestResultListingComponent } from './../test-results/components/test-result-listing/test-result-listing.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'test-results',
        component: TestResultListingComponent
      },
      {
        path: 'test-results/new',
        component: TestResultFormComponent
      },
      {
        path: 'patients',
        component: PatientListingComponent
      },
      {
        path: '**',
        redirectTo: 'test-results'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
