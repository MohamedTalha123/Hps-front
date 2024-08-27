import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/keycloak/keycloak.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router, private keycloakService: KeycloakService) {}

//    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
//     const isAuthenticated = await this.keycloakService.init();    
//     if (!isAuthenticated ||  this.keycloakService.keycloak.isTokenExpired() ) {
//       this.keycloakService.init();
//       this.keycloakService.keycloak.login();  // Trigger login if not authenticated
//       return false;
//     }
//       return true;
//     }
//   }

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  if (authService.isLoggedIn()) {
    return true;
  }
  authService.redirectToLoginPage();
  return false;
};


// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard extends KeycloakAuthGuard {
  
//   constructor(
//     protected readonly routerr: Router,
//     protected readonly keycloak: KeycloakService
//   ) {
//     super(routerr, keycloak);
//   }
  
//   async isAccessAllowed(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
//     const roles = this.keycloak.getUserRoles();
//     const expectedRoles = route.data['roles'] as string[];
//     // if (!this.authenticated || this.keycloak.isTokenExpired() ||  !expectedRoles.some(role => roles.includes(role))){
//     //   await this.keycloak.login({
//     //     redirectUri: window.location.origin + state.url,
//     //   });
//     // }
//     if (!this.authenticated) {
//       await this.keycloak.login({
//         redirectUri: window.location.origin + state.url
//       });
//     }

//     return this.authenticated;
//   }
// }

