// environment.development.ts
export const environment = {
    production: false,
    keycloak: {
      authority: 'http://localhost:9000',
      redirectUri: 'http://localhost:4200', 
      postLogoutRedirectUri: 'http://localhost:4200', 
      realm: 'Hps-microservice',
      clientId: 'hps-front-end'
    }
  };
  