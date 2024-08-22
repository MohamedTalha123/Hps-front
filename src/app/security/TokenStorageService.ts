import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private readonly TOKEN_KEY = 'auth-token';
  private readonly REFRESH_TOKEN_KEY = 'refresh-token';
 
  constructor() {}
 
  public saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
 
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
 
  public saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }
 
  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }
 
  public clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}
 