import { Injectable } from '@angular/core';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from './user-profile';
import { Observable } from 'rxjs';

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
        const attributes = this.keycloak.tokenParsed['phone'];
        if (attributes) {
          this._profile.phone = attributes as string;
        }
      }
    }
  }
  // this.fetchAdditionalUserInfo(this._profile.email!).subscribe(userInfo => {
  //   this._profile!.id = userInfo.id;
  //   this._profile!.phone = userInfo.phone;
  // });

  fetchAdditionalUserInfo(email: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`http://localhost:8091/api/v1/users/email=${email}`);
  }


  login() {
    return this.keycloak.login();
  }

  logout() {
    return this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
  }
}
