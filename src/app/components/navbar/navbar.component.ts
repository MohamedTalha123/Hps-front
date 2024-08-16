import { Component, HostListener } from '@angular/core';
import { CartItem } from '../../entity/cart';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isNavbarHidden = false;
  isMenuCollapsed = true;
  isBrandsDropdownVisible = false;
  dropdownTimeout: any;
  lastScrollTop = 0;
  navbarHeight = 70; // Adjust this to match your navbar's height
  scrollThreshold = 200; // Adjust this value to change when the navbar reappears
  hidePosition = 0;
  cartItems: CartItem[] = [];
  cartItemsCount: number = 0;
  cartTotal: number = 0;
  isCartDropdownVisible: boolean = false;
  cartDropdownTimeout: any;


  // New state to track which option is selected
  selectedOption: string = 'home';
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.cartItemsCount = this.cartService.getTotalItems();
      this.cartTotal = this.cartService.getTotal();
    });
  }
  showCartDropdown() {
    clearTimeout(this.cartDropdownTimeout);
    this.isCartDropdownVisible = true;
  }

  hideCartDropdown() {
    this.cartDropdownTimeout = setTimeout(() => {
      this.isCartDropdownVisible = false;
    }, 200); // 200ms delay before hiding
      }
  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
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

  selectBrand(brand: string) {
    // Handle the selection of a brand here, if needed.
    // For now, just set the selected option to 'brands'
    this.selectedOption = 'brands';
  }
}
