import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductResponse } from '../../entity/product';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { AuthService } from '../../services/keycloak/keycloak.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entity/user';

@Component({
  selector: 'app-product-preview-popup',
  templateUrl: './product-preview-popup.component.html',
  styleUrls: ['./product-preview-popup.component.css']
})
export class ProductPreviewPopupComponent implements OnInit {
  quantity: number = 1;
  maxQuantityError: boolean = false;
  user !: User;
  constructor(
    public dialogRef: MatDialogRef<ProductPreviewPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public product: ProductResponse,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private userService: UserService
  ) { }
  authService = inject(AuthService);

  ngOnInit(): void {
    const isLoggedIn = this.authService.isLoggedIn() as boolean;
    if (isLoggedIn) {
      this.userService.user$.subscribe(response => {
        this.user = response;
      })
    }
  }

  increaseQuantity() {
    if (this.quantity < this.product.availableQuantity) {
      this.quantity++;
      this.maxQuantityError = false;
    } else {
      this.maxQuantityError = true;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.maxQuantityError = false;
    }
  }

  addToCart() {
    if (!this.authService.isLoggedIn()) {
      this.authService.redirectToLoginPage();
      return;
    }

    if (this.product) {
      this.checkoutService.createOrder(
        {
          product_id: this.product?.id,
          quantity: this.quantity,
          user_id: this.user?.id
        }
      ).subscribe(response => {
        if (response) {
          this.cartService.addToCart(this.product as ProductResponse, this.quantity);
        }
      })
      this.dialogRef.close();
    } else {
      console.error('Cannot buy: Product is undefined');
    }
  }
}