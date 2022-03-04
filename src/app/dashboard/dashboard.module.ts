import { PatientsModule } from './../patients/patients.module';
import { TestResultsModule } from './../test-results/test-results.module';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component'


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
  ]
})
export class DashboardModule { }
