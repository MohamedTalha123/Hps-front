import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Brand, BrandRequest, BrandResponse } from '../entity/brand';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = 'http://localhost:8091/api/v1/brands';

  constructor(private http: HttpClient, private authService: OAuthService) {}
 
  private getHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
 
  private handleError(error: any) {
    console.error('API error:', error);
    return throwError(error);
  }
  getAllBrands(): Observable<BrandResponse[]> {
    return this.http.get<BrandResponse[]>("http://localhost:8091/api/v1/brands/public");
  }

  getBrandById(id: number): Observable<BrandResponse> {
    return this.http.get<BrandResponse>(`${this.apiUrl}/public${id}`);
  }

  createBrand(brand: BrandRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, brand,{ headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
  }

  updateBrand(id: number, brand: BrandRequest): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, brand,{ headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
  }
}
