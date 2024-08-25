import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../entity/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private readonly apiUrl = 'http://localhost:8091/api/v1/orders';
  

  constructor(private http: HttpClient) { }

  createOrder(orderRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, orderRequest);
  }
  

  createBill(billRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, billRequest);
  }
  getCurrentOrder():Observable<any>{
    return this.http.get(`${this.apiUrl}/getCurrentOrder`);
  }
  getCurrentOrderLineItems():Observable<any>{
    return this.http.get(`${this.apiUrl}/getCurrentOrderLineItems`);
  }

  createPaymentIntent(paymentIntentRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-intent`, paymentIntentRequest);
  }

  payBill(billRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay-bill`, billRequest);
  }

  confirmBillPayment(verificationCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-payment`,  verificationCode );
  }
}
