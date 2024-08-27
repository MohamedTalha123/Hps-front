// src/app/components/cart/cart.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from "../../entity/cart";
import { CheckoutService } from '../../services/checkout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';
import { BillRequest } from '../../entity/Bill';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  secretKey !: string;

  constructor(private cartService: CartService, private checkoutService: CheckoutService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog,
  ) { }

  private keycloakService = inject(KeycloakService);

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
      console.log('Cart items:', this.cartItems);

    });
  }

  updateQuantity(item: CartItem, change: number) {
    let newQuantity = item.quantity + change;
    if (newQuantity > 0 && newQuantity <= item.product.availableQuantity) {

      this.cartService.updateOrder({
        product_id: item.product.id,
        quantity: -change
      }).subscribe(response => {
        if (response) {
          this.cartService.updateQuantity(item.product.id, newQuantity);
        }
      })
    }
  }
  removeItem(productId: number, quantity: number) {
    this.cartService.updateOrder({
      product_id: productId,
      quantity: quantity
    }).subscribe(response => {
      if (response) {
        this.cartService.removeFromCart(productId);
      }
    })
  }

  updateCart() {
    // This method is called when the "Update Cart" button is clicked
    // The cart is already updated in real-time, so this could be used for additional actions
    console.log('Cart updated');
  }

  openPaymentPopup() {
    this.checkoutService.getCurrentOrder().subscribe(order => {
      if (order) {
        const orderId = order?.id;
        const userId = this.keycloakService.profile?.id as string;
        const phone = this.keycloakService.profile?.phone as string;
        const billRequest: BillRequest = {
          phone: phone,
          clientId: userId, 
          orderId: orderId,
          amount: this.total
        };
  
        this.checkoutService.createBill(billRequest).subscribe(
          response => {
            if (response) {
              this.checkoutService.createPaymentIntent({
                amount: this.total * 10,
                currency: 'USD',
                receiptEmail: this.keycloakService.profile?.email || ''
              }).subscribe(
                PaymentResponse => {
                  this.secretKey = PaymentResponse.client_secret;
                  if (this.secretKey) {
                    this.dialog.open(CheckoutComponent, {
                      data: this.secretKey,
                      width: '800px',
                      height: '400px'
                    });
                  }
                }
              );
            }
          }
        );
      }
    });
  }

  

}
