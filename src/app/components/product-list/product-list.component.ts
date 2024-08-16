import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, Sexe } from '../../entity/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductPreviewPopupComponent } from '../product-preview-popup/product-preview-popup.component';
import { ProductPageComponent } from '../product-page/product-page.component';
import { BrandService } from "../../services/brand.service";

import { Router } from '@angular/router';
import { Brand } from '../../entity/brand';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  pagedProducts: Product[] = [];
  pageSize = 36; // 4 columns * 9 rows
  currentPage = 0;
  priceRange: number[] = [0, 1000];
  minPrice = 0;
  maxPrice = 10000;
  genders = [Sexe.MALE, Sexe.FEMALE, Sexe.UNISEX];
  brands: Brand[] = [];
  selectedFilters: { type: string; value: any }[] = [];
  sortOptions = ['Price: Low to High', 'Price: High to Low'];
  selectedSort = '';

  constructor(    private productService: ProductService,
    private dialog: MatDialog,    private router: Router, private brandService : BrandService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = this.products;
      this.updatePriceRange();
      this.updatePagedProducts();
    });    
    this.brandService.getAllBrands().subscribe(brands => {
      this.brands = brands;
    });
        console.log(this.products); // Ensure products are logged
    this.brands = [...new Set(this.products.map(p => p.brand))];
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
    this.selectedFilters = this.selectedFilters.filter(f => f.type !== type);
    this.selectedFilters.push({ type, value });
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
            return product.brand === filter.value;
          case 'price':
            return product.price >= filter.value[0] && product.price <= filter.value[1];
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
