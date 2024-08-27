import { inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../../environments/environment';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly #keycloakService = inject(KeycloakService);

  private _profile !: UserProfile;


  redirectToLoginPage(): Promise<void> {
    return this.#keycloakService.login();
  }

  get userName(): string {
    return this.#keycloakService.getUsername();
  }

  get profile(): UserProfile | undefined {
    this.loadUserProfile();
    return this._profile;
  }

  async loadUserProfile() {
    try {
      const userProfile = await this.#keycloakService.loadUserProfile();
      this._profile = {
        id: userProfile.id,
        username: userProfile.username,
        email: userProfile.email,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
      };
      console.log('profile ' + JSON.stringify(this._profile));
    } catch (error) {
      console.error('Failed to load user profile', error);
    }
    return this._profile;
  }

  isLoggedIn(): boolean {
    return this.#keycloakService.isLoggedIn();
  }

  logout(): void {
    this.#keycloakService.clearToken();
    this.#keycloakService.logout(environment.keycloak.postLogoutRedirectUri);
  }

  get token(): any {
    return this.#keycloakService.getToken();
  }
}
