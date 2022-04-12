import { NoAuthGuardService } from './services/no-auth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { JwtService } from './services/jwt.service';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    AuthService,
    JwtService,
    TokenInterceptorService,
    AuthGuardService,
    NoAuthGuardService
  ]
})
export class CoreModule { }
