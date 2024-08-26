import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: {
            url: 'http://localhost:9000',
            realm: 'Hps-microservice',
            clientId: 'hps-front-end'
        }
      });
}