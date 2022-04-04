import { TokenInterceptorService } from './services/token-interceptor.service';
import { JwtService } from './services/jwt.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    JwtService,
    TokenInterceptorService
  ]
})
export class CoreModule { }
