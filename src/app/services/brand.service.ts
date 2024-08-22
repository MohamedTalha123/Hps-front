import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Brand, BrandRequest, BrandResponse } from '../entity/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = 'http://localhost:8091/api/v1/brands';

  constructor(private http: HttpClient) {}
 

 
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
    return this.http.post<number>(this.apiUrl, brand)
    .pipe(catchError(this.handleError));
  }

  updateBrand(id: number, brand: BrandRequest): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, brand)
    .pipe(catchError(this.handleError));
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }
}
