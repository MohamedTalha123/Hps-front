import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductResponse } from '../../entity/product';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { KeycloakService } from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-product-preview-popup',
  templateUrl: './product-preview-popup.component.html',
  styleUrls: ['./product-preview-popup.component.css']
})
export class ProductPreviewPopupComponent {
  quantity: number = 1;
  maxQuantityError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProductPreviewPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public product: ProductResponse,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private keycloakService: KeycloakService
  ) { }


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

  async addToCart() {
    const authenticated = await this.keycloakService.init();
    if (authenticated && this.product) {
      this.checkoutService.createOrder(
        {
          product_id: this.product?.id,
          quantity: this.quantity,
          user_id: this.keycloakService.profile?.id as string
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