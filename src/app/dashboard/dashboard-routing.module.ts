import { TestResultViewComponent } from './../test-results/components/test-result-view/test-result-view.component';
import { EditTestResultResolverService } from './../test-results/services/edit-test-result-resolver.service';
import { AuthGuardService } from './../core/services/auth-guard.service';
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
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'test-results',
        component: TestResultListingComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'test-results/new',
        component: TestResultFormComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'test-results/:id/view',
        component: TestResultViewComponent,
        canActivateChild: [AuthGuardService],
        resolve: {
          testResult: EditTestResultResolverService
        }
      },
      {
        path: 'test-results/:id',
        component: TestResultFormComponent,
        canActivateChild: [AuthGuardService],
        resolve: {
          testResult: EditTestResultResolverService
        }
      },
      {
        path: 'patients',
        component: PatientListingComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: '**',
        redirectTo: 'test-results',
        canActivateChild: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
