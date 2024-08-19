import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { ProductService } from '../../services/product.service';
import { Brand, BrandRequest, BrandResponse } from '../../entity/brand';
import { Product, ProductRequest, ProductResponse } from '../../entity/product';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  activeTab: 'brands' | 'products' = 'brands';
  brands: BrandResponse[] = [];
  products: ProductResponse[] = [];
  showBrandModal = false;
  showProductModal = false;
  currentBrand: BrandRequest = {} as BrandRequest;
  currentProduct: ProductRequest = {} as ProductRequest;
  editingBrand = false;
  editingProduct = false;
  editingBrandId: number | null = null;
  editingProductId: number | null = null;

  constructor(
    private brandService: BrandService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
    this.loadProducts();
  }

  loadBrands(): void {
    this.brandService.getAllBrands().subscribe(
      (brands: BrandResponse[]) => this.brands = brands,
      (error: any) => console.error('Error loading brands:', error)
    );
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products: ProductResponse[]) => this.products = products,
      (error: any) => console.error('Error loading products:', error)
    );
  }

  openAddBrandModal(): void {
    this.currentBrand = {} as BrandRequest;
    this.editingBrand = false;
    this.showBrandModal = true;
  }

  openUpdateBrandModal(brand: BrandResponse): void {
    this.currentBrand = { 
      name: brand.name, 
      description: brand.description, 
      imageUrl: brand.imageUrl 
    };
    this.editingBrand = true;
    this.editingBrandId = brand.id;
    this.showBrandModal = true;
  }

  closeBrandModal(): void {
    this.showBrandModal = false;
  }

  saveBrand(): void {
    if (this.editingBrand && this.editingBrandId) {
      this.brandService.updateBrand(this.editingBrandId, this.currentBrand).subscribe(
        () => {
          this.loadBrands();
          this.closeBrandModal();
        },
        (error: any) => console.error('Error updating brand:', error)
      );
    } else {
      this.brandService.createBrand(this.currentBrand).subscribe(
        () => {
          this.loadBrands();
          this.closeBrandModal();
        },
        (error: any) => console.error('Error creating brand:', error)
      );
    }
  }

  deleteBrand(id: number): void {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brandService.deleteBrand(id).subscribe(
        () => this.loadBrands(),
        (error: any) => console.error('Error deleting brand:', error)
      );
    }
  }

  openAddProductModal(): void {
    this.currentProduct = {} as ProductRequest;
    this.editingProduct = false;
    this.showProductModal = true;
  }
  openUpdateProductModal(product: ProductResponse): void {
    this.currentProduct = { 
      name: product.name,
      description: product.description,
      availableQuantity: product.availableQuantity,
      price: product.price,
      imageUrl: product.imageUrl,
      sexe: product.sexe,
      brandId: product.brandId
    };
    this.editingProduct = true;
    this.editingProductId = product.id;
    this.showProductModal = true;
  }

  closeProductModal(): void {
    this.showProductModal = false;
  }

  saveProduct(): void {
    if (this.editingProduct && this.editingProductId) {
      this.productService.updateProduct(this.editingProductId, this.currentProduct).subscribe(
        () => {
          this.loadProducts();
          this.closeProductModal();
        },
        (error: any) => console.error('Error updating product:', error)
      );
    } else {
      this.productService.createProduct(this.currentProduct).subscribe(
        () => {
          this.loadProducts();
          this.closeProductModal();
        },
        (error: any) => console.error('Error creating product:', error)
      );
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        () => this.loadProducts(),
        (error: any) => console.error('Error deleting product:', error)
      );
    }
  }
}
