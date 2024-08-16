import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../entity/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product?: Product;
  quantity: number = 1;
  maxQuantityError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert to number
      this.productService.getProductById(id).subscribe(
        foundProduct => {
          if (foundProduct) {
            this.product = foundProduct;
          } else {
            console.error('Product not found');
            // You might want to navigate to a 404 page or back to the product list
          }
        },
        error => console.error('Error fetching product:', error)
      );
    });}
  

    private loadProduct(id: number) {
      this.productService.getProductById(id).subscribe(
        foundProduct => {
          if (foundProduct) {
            this.product = foundProduct;
          } else {
            console.error('Product not found');
            // You might want to navigate to a 404 page or back to the product list
          }
        },
        error => console.error('Error fetching product:', error)
      );
    }
  increaseQuantity() {
    if (this.product && this.quantity < this.product.availableQuantity) {
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
    } else {
      console.error('Cannot buy: Product is undefined');
    }
  }
}  