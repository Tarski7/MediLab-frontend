import { NoAuthGuardService } from './core/services/no-auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'signup',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path : 'dashboard',
    loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
