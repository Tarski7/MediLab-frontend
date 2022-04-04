import { TokenInterceptorService } from './../core/services/token-interceptor.service';
import { PatientsModule } from './../patients/patients.module';
import { TestResultsModule } from './../test-results/test-results.module';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    TestResultsModule,
    PatientsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true
  }]
})
export class DashboardModule { }
