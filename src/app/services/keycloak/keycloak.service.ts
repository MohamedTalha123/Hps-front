import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from './user-profile';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  constructor(private http: HttpClient) {}

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:9000',
        realm: 'Hps-microservice',
        clientId: 'hps-front-end'
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init() {
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required',
    });

    if (authenticated) {
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token || '';

      if (this.keycloak.tokenParsed) {
        const email = this._profile.email;
        const attributes = this.keycloak.tokenParsed['phone'];
        if (attributes) {
          this._profile.phone = attributes as string;
        }

        if (email) {
          // Fetch the user ID from your backend using the email
          const userInfo = await firstValueFrom(this.fetchAdditionalUserInfo(email));
          this._profile.id = userInfo.id;
          this._profile.phone = userInfo.phone;
        }
      }
    }
  }

  fetchAdditionalUserInfo(email: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`http://localhost:8091/api/v1/users/email/${email}`);
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    return this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
  }
  isLoggedIn(): boolean {
    return this.keycloak.authenticated ?? false;
  }
  
  getUsername(): string | undefined {
    return this.keycloak.tokenParsed?.['preferred_username'];
  }
}
