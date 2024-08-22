import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, Sexe,ProductResponse } from '../../entity/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductPreviewPopupComponent } from '../product-preview-popup/product-preview-popup.component';
import { Router } from '@angular/router';
import { BrandService } from "../../services/brand.service";
import { Brand } from '../../entity/brand';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../security/AuthService';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  pagedProducts: Product[] = [];
  pageSize = 36;
  currentPage = 0;
  priceRange: number[] = [0, 1000];
  minPrice = 0;
  maxPrice = 10000;
  genders = [Sexe.MALE, Sexe.FEMALE, Sexe.UNISEX];
  brands: Brand[] = [];
  selectedFilters: { type: string; value: any }[] = [];
  sortOptions = ['Price: Low to High', 'Price: High to Low'];
  selectedSort = '';

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private authservice: AuthService

  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
    this.route.queryParams.subscribe(params => {
      if (params['brand']) {
        this.applyFilter('brand', params['brand']);
      }
      if (params['gender']) {
        this.applyFilter('gender', params['gender']);
      }
      if (params['search']) {
        this.applyFilter('search', params['search']);
      }
    });
  }
  

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      products => {
        this.products = products;
        console.log('Products received:', products);
        this.filteredProducts = this.products;
        this.updatePriceRange();
        this.updatePagedProducts();
      },
      error => console.error('Error loading products:', error)
    );
    console.log("User roles"+this.authservice.getRoles());

  }


  loadBrands(): void {
    this.brandService.getAllBrands().subscribe(
      brands => {
        this.brands = brands;
      },
      error => console.error('Error loading brands:', error)
    );
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  isFilterActive(type: string, value: any): boolean {
    return this.selectedFilters.some(f => f.type === type && f.value === value);
  }

  updatePriceRange() {
    this.minPrice = Math.floor(Math.min(...this.products.map(p => p.price)));
    this.maxPrice = Math.ceil(Math.max(...this.products.map(p => p.price)));
    this.priceRange = [this.minPrice, this.maxPrice];
  }

  updatePagedProducts() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = this.filteredProducts.slice(start, end);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.updatePagedProducts();
  }

  applyFilter(type: string, value: any) {
    const existingFilterIndex = this.selectedFilters.findIndex(f => f.type === type);
    if (existingFilterIndex !== -1) {
      this.selectedFilters[existingFilterIndex].value = value;
    } else {
      this.selectedFilters.push({ type, value });
    }
    this.applyFilters();
  }

  removeFilter(filter: { type: string; value: any }) {
    this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
    this.applyFilters();
  }
  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      return this.selectedFilters.every(filter => {
        switch (filter.type) {
          case 'gender':
            return product.sexe === filter.value;
          case 'brand':
            return product.brandName.toLowerCase() === filter.value.toLowerCase();
          case 'price':
            return product.price >= filter.value[0] && product.price <= filter.value[1];
          case 'search':
            return product.name.toLowerCase().includes(filter.value.toLowerCase());
          default:
            return true;
        }
      });
    });
    this.applySorting();
    this.updatePagedProducts();
  }

  applyPriceFilter() {
    this.applyFilter('price', this.priceRange);
  }

  applySorting() {
    if (this.selectedSort === 'Price: Low to High') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'Price: High to Low') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
    this.updatePagedProducts();
  }
  openPreviewPopup(product: Product) {
    this.dialog.open(ProductPreviewPopupComponent, {
      data: product,
      width: '800px'
    });
  }

  navigateToProductPage(product: Product) {
    this.router.navigate(['/product', product.id]);
  }
  
}
