import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiUrl = 'http://localhost:8091/api/v1/orders';

  constructor(private http: HttpClient) { }

  createOrder(orderRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, orderRequest);
  }

  createBill(billRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, billRequest);
  }

  createPaymentIntent(paymentIntentRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-intent`, paymentIntentRequest);
  }

  payBill(billRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay-bill`, billRequest);
  }

  confirmBillPayment(verificationCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-payment`, { verificationCode });
  }
}
