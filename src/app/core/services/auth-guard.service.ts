import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private jwtService: JwtService,
    private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.jwtService.getToken()) {
      return of(true);
    }

    const token = route.queryParamMap.get('token');
    if (token) {
      return this.authService.isAuthenticated(token).pipe(
        map(authenticated => {
          if (authenticated === true) {
            this.jwtService.setToken(token);
            this.router.navigate(['/dashboard', 'test-results']);
            return true;
          }

          this.router.navigate(['/login']);
          return false;
        }),catchError((err: any) => {
          this.router.navigate(['/login']);
          return of(false);
        })
      )
    }
    else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
