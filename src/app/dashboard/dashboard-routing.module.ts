import { PatientListingComponent } from './../patients/components/patient-listing/patient-listing.component';
import { TestResultListingComponent } from './../test-results/components/test-result-listing/test-result-listing.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MainContentComponent
      },
      {
        path: 'test-results',
        component: TestResultListingComponent
      },
      {
        path: 'patients',
        component: PatientListingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
