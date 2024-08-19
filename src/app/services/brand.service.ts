import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand, BrandRequest, BrandResponse } from '../entity/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = 'http://localhost:8091/api/v1/brands';

  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<BrandResponse[]> {
    return this.http.get<BrandResponse[]>(this.apiUrl);
  }

  getBrandById(id: number): Observable<BrandResponse> {
    return this.http.get<BrandResponse>(`${this.apiUrl}/${id}`);
  }

  createBrand(brand: BrandRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, brand);
  }

  updateBrand(id: number, brand: BrandRequest): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, brand);
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
