import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './AuthService';
 
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn) {
      const expectedRole = route.data['expectedRole'] || null;
 
      if (expectedRole && !this.authService.hasRole(expectedRole)) {
        console.warn('User does not have the required role, redirecting to forbidden.');
        this.router.navigate(['/forbidden']);
        return false;
      }
 
      return true;
    } else {
      console.log('User is not logged in, redirecting to login.');
      this.authService.login();
      return false;
    }


  }
  
}
 