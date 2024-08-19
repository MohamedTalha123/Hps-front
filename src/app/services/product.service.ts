import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductRequest, ProductResponse } from '../entity/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8091/api/v1/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.apiUrl);
  }

  searchProducts(query: string): Observable<ProductResponse[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        if (response && Object.keys(response).length > 0) {
          return response;
        } else {
          throw new Error('Product not found');
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('An error occurred while fetching the product. Please try again.'));
  }

  createProduct(product: ProductRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, product);
  }

  updateProduct(id: number, product: ProductRequest): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductsByBrand(brand: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.apiUrl}/brand/${brand}`);
  }
}
