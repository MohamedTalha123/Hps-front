import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router, private keycloakService: KeycloakService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isAuthenticated = await this.keycloakService.keycloak.authenticated;
    if (!isAuthenticated) {
      this.keycloakService.login();  // Trigger login if not authenticated
      return false;
    }
      return true;
    }
  }

