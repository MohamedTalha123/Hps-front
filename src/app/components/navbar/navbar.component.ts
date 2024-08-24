import { Component, HostListener, OnInit } from '@angular/core';
import { CartItem } from '../../entity/cart';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../entity/brand';
import { ProductService } from '../../services/product.service';
import { Product, ProductResponse } from '../../entity/product';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { CheckoutService } from '../../services/checkout.service';
import { BillRequest } from '../../entity/Bill';
import { response } from 'express';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  brands: Brand[] = [];
  isNavbarHidden = false;
  isMenuCollapsed = true;
  isBrandsDropdownVisible = false;
  dropdownTimeout: any;
  lastScrollTop = 0;
  navbarHeight = 70;
  scrollThreshold = 200;
  hidePosition = 0;
  cartItems: CartItem[] = [];
  cartItemsCount: number = 0;
  cartTotal: number = 0;
  isCartDropdownVisible: boolean = false;
  cartDropdownTimeout: any;
  searchQuery: string = '';
  searchResults: ProductResponse[] = [];
  private searchSubject = new Subject<string>();

  public cartSubject = new BehaviorSubject<any>(null);


  selectedOption: string = 'home';
  constructor(private cartService: CartService, private brandService: BrandService, private productService: ProductService, private router: Router, private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.cartItemsCount = items.length;
      this.cartTotal = +Number(this.cartService.getTotal()).toFixed(2);
    });

    this.checkoutService.getCurrentOrder().subscribe(response => {
      if (response) {
        this.checkoutService.getCurrentOrderLineItems().subscribe(lineItems => {
          this.cartSubject.next(lineItems);
          this.cartItems = lineItems;
          this.cartItemsCount = lineItems.length;
          this.cartTotal = response?.totalAmount;

          this.cartService.updateCartItems(this.cartItems);
          this.loadBrands();
        })
      }
    })

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.productService.searchProducts(query))
    ).subscribe(results => {
      this.searchResults = results.slice(0, 5);
    });
  }
  loadBrands() {
    this.brandService.getAllBrands().subscribe(
      (brands: Brand[]) => {
        this.brands = brands;
      },
      error => {
        console.error('Error loading brands:', error);
      }
    );
  }

  navigateTo(route: string, filter?: { type: string, value: any }) {
    if (filter) {
      this.router.navigate([route], { queryParams: { [filter.type]: filter.value } });
    } else {
      this.router.navigate([route]);
    }
    this.selectedOption = route;
  }

  selectBrand(brand: string) {
    this.selectedOption = 'brands';
    this.navigateTo('/products', { type: 'brand', value: brand });
  }

  showCartDropdown() {
    clearTimeout(this.cartDropdownTimeout);
    this.isCartDropdownVisible = true;
  }

  hideCartDropdown() {
    this.cartDropdownTimeout = setTimeout(() => {
      this.isCartDropdownVisible = false;
    }, 200);
  }

  removeFromCart(productId: number, quantity: number) {
    this.cartService.updateOrder({
      product_id: productId,
      quantity: quantity
    }).subscribe(response => {
      if (response) {
        console.log(response);
        this.cartService.removeFromCart(productId);

        this.cartService.cart$.subscribe(items => {
          this.cartSubject.next(items);

          this.cartItems = this.cartSubject.value;
          this.cartItemsCount = items.length;
          this.cartTotal = +Number(this.cartService.getTotal()).toFixed(2);
        });
      }
    })
  }

  toggleCartDropdown() {
    this.isCartDropdownVisible = !this.isCartDropdownVisible;
    console.log('Cart dropdown toggled');

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > this.lastScrollTop && currentScrollTop > this.navbarHeight) {
      // Scrolling down and past the navbar
      if (!this.isNavbarHidden) {
        this.isNavbarHidden = true;
        this.hidePosition = currentScrollTop;
      }
    } else if (currentScrollTop < this.lastScrollTop) {
      // Scrolling up
      this.isNavbarHidden = false;
    }

    // Check if we've scrolled past the threshold from where the navbar was hidden
    if (this.isNavbarHidden && currentScrollTop > (this.hidePosition + this.scrollThreshold)) {
      this.isNavbarHidden = false;
    }

    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }

  toggleNavbar() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  showBrandsDropdown() {
    clearTimeout(this.dropdownTimeout);
    this.isBrandsDropdownVisible = true;
  }

  hideBrandsDropdown() {
    this.dropdownTimeout = setTimeout(() => {
      this.isBrandsDropdownVisible = false;
    }, 200); // 200ms delay before hiding
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }
  onSearchInput() {
    this.searchSubject.next(this.searchQuery);
  }

  onSearch() {
    if (this.searchQuery) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
      this.searchResults = []; // Clear results after search
    }
  }

  navigateToProduct(product: Product) {
    this.router.navigate(['/product', product.id]);
    this.searchQuery = '';
    this.searchResults = [];
  }
  checkout() {
    const billRequest: BillRequest = {
      phone: '0607677381',
      clientId: 'id',
      orderId: 'id',
      amount: this.cartTotal
    }
    this.checkoutService.createBill(billRequest).subscribe(
      response => {
        console.log(response);

      });
    this.router.navigate(['/checkout']);

  }
}