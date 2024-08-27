import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductRequest, ProductResponse } from '../entity/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8091/api/v1/products';

  constructor(private http: HttpClient) {}
 
  private handleError(error: any) {
    console.error('API error:', error);
    return throwError(error);}

  getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>("http://localhost:8091/api/v1/products/public");
  }

  searchProducts(query: string): Observable<ProductResponse[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`http://localhost:8091/api/v1/products/public/${id}`);}



  createProduct(product: ProductRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, product)
    .pipe(catchError(this.handleError));
  }

  updateProduct(id: number, product: ProductRequest): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, product)
    .pipe(catchError(this.handleError));
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }

  getProductsByBrand(brand: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.apiUrl}/brand/${brand}`)
    .pipe(catchError(this.handleError));
  }
}
