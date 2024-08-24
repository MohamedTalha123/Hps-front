import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductResponse } from '../entity/product';
import { CartItem } from "../entity/cart";
import { Order, OrderLineResponse } from '../entity/order';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly apiUrl = 'http://localhost:8091/api/v1/orders';  

  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) { }

  addToCart(product: ProductResponse, quantity: number) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.cartSubject.next(this.cartItems);
  }

  // Removes a product from the cart
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cartSubject.next(this.cartItems);
  }

  // Updates the quantity of a product in the cart
  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next(this.cartItems);
    }
  }

  // Calculates the total price of items in the cart
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  // Calculates the total number of items in the cart
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  updateOrder(orderRequest: any): Observable<Order> {
    return this.http.put<Order>(this.apiUrl, orderRequest);
  }

  deleteOrder(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }

  getOrderSummary(): Observable<OrderLineResponse[]> {
    return this.http.get<OrderLineResponse[]>(`${this.apiUrl}/summary`);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }
}
