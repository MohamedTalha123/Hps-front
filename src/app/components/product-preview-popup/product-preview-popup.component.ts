import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../entity/product';
import { CartService } from '../../services/cart.service';

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
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private cartService: CartService

  ) {}

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

  buyProduct() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      console.log(`Buying ${this.quantity} of ${this.product.name}`);
      this.dialogRef.close();
    } else {
      console.error('Cannot buy: Product is undefined');
    }
  }
}