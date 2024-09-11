import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../entity/product';
import { CartService } from '../../services/cart.service';
import { Subscription, filter } from 'rxjs';
import { CheckoutService } from '../../services/checkout.service';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from '../../services/keycloak/keycloak.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entity/user';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product?: ProductResponse;
  quantity: number = 1;
  maxQuantityError: boolean = false;
  isLoading = true;
  error?: string;
  user !: User;
  noQuantityError :boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private userService: UserService
  ) { }
  authService = inject(AuthService);

  ngOnInit() {
    window.scrollTo(0, 0);
    const isLoggedIn = this.authService.isLoggedIn() as boolean;
    if (isLoggedIn) {
      this.userService.user$.subscribe(response => {
        this.user = response;
      })
    }
    this.loadProductFromRoute();
    this.subscriptions.push(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.loadProductFromRoute();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadProductFromRoute() {
    window.scrollTo(0, 0);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Loading product with id:', id);
    if (id) {
      this.loadProduct(id);
    } else {
      console.error('Invalid product ID');
      this.error = 'Invalid product ID';
      this.isLoading = false;
    }
  }

  private loadProduct(id: number) {
    this.isLoading = true;
    this.error = undefined;
    this.product = undefined;

    this.subscriptions.push(
      this.productService.getProductById(id).subscribe({
        next: (foundProduct) => {
          console.log('Product loaded:', foundProduct);
          this.isLoading = false;
          this.product = foundProduct;
        },
        error: (error) => {
          console.error('Error fetching product:', error);
          this.isLoading = false;
          this.error = error.message || 'Error loading product';
        }
      })
    );
  }

  increaseQuantity() {
    if (this.product && this.quantity < this.product.availableQuantity) {
      this.quantity++;
      this.maxQuantityError = false;
    } else {
      this.noQuantityError = false;

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

    if (this.quantity > this.product!.availableQuantity) {
      this.maxQuantityError = false;
      this.noQuantityError = true;
      return;
    }
    console.log('userr iddd ' + this.user?.id);

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

  }
}