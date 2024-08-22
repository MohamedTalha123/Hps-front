import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './AuthConfig';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService, private router: Router) {
    this.configure();
  }
 
  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin({
      onTokenReceived: (context) => {
        console.log("Token received:", context);
        this.router.navigate(['/home']);
      },
      onLoginError: (err) => {
        console.error("Error during login:", err);
        this.router.navigate(['/home']);
      }
    });
 
    this.oauthService.setupAutomaticSilentRefresh();
  }
 
  public login() {
    this.oauthService.initLoginFlow();
  }
 
  public logout() {
    this.oauthService.logOut();
  }
 
  public get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }
 
  public get isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }
 
  public handleLoginCallback() {
    this.oauthService.loadDiscoveryDocumentAndTryLogin({
      onTokenReceived: context => {
        console.log("Token received:", context);
        this.router.navigate(['/home']);
      },
      onLoginError: err => {
        console.error("Error during login:", err);
        this.router.navigate(['/home']);
      }
    });
  }
 
  public getFirstName(): string {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.given_name : null;
  }
 
  public getLastName(): string {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.family_name : null;
  }
 
  public getFullName(): string {
    return this.getLastName() + ' ' + this.getFirstName();
  }
 
  public getUserId(): string | null {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.sub : null;
  }
 
  public getRoles(): string[] {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims?.groups || [];
  }
 
  public hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }
  public getUserEmail(): string {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.email : null;
  }
}