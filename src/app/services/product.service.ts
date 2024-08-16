// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Product, Sexe } from '../entity/product';
import { Brand } from '../entity/brand';
import { BrandService } from "./brand.service";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private brands: Brand[] = [];
  private products: Product[] = [];

  constructor(private brandService: BrandService) {
    this.initializeBrandsAndProducts();
  }

  private initializeBrandsAndProducts() {
    this.brandService.getAllBrands().subscribe(brands => {
      this.brands = brands;
      this.initializeProducts();
    });
  }

  private initializeProducts() {
  this.products = [
    new Product(1, 'RHYTHM-High Quality Rhythm Watch', 'High quality rhythm watch', 'RHYTHM-001', 0, 199.99, '../../../assets/images/products/rhythm/1.png', Sexe.UNISEX, this.brands.find(b => b.name === 'RHYTHM')!),
    new Product(2, 'YEMA-Classic YEMA Watch', 'Classic YEMA watch', 'YEMA-001', 15, 299.99, '../../../assets/images/products/yema/1.png', Sexe.MALE, this.brands.find(b => b.name === 'YEMA')!),
    new Product(3, 'PACO RABANNE-Stylish Paco Rabanne Watch', 'Stylish Paco Rabanne watch', 'PACO-001', 5, 399.99, '../../../assets/images/products/paco rabanne/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'PACO RABANNE')!),
    new Product(4, 'MORGAN-Elegant Morgan Watch', 'Elegant Morgan watch', 'MORGAN-001', 8, 149.99, '../../../assets/images/products/morgan/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'MORGAN')!),
    new Product(5, 'YONGER & BRESSON-Premium Yonger & Bresson Watch', 'Premium Yonger & Bresson watch', 'YB-001', 12, 499.99, '../../../assets/images/products/younger & bresson/1.png', Sexe.MALE, this.brands.find(b => b.name === 'YONGER & BRESSON')!),
    new Product(6, 'DANIEL HECHTER-Exclusive Daniel Hechter Watch', 'Exclusive Daniel Hechter watch', 'DH-001', 7, 559.99, '../../../assets/images/products/daniel hechter/1.png', Sexe.MALE, this.brands.find(b => b.name === 'DANIEL HECHTER')!),
    new Product(7, 'FESTINA-Sporty Festina Watch', 'Sporty Festina watch', 'FESTINA-001', 20, 269.99, '../../../assets/images/products/festina/1.png', Sexe.MALE, this.brands.find(b => b.name === 'FESTINA')!),
    new Product(8, 'ROLEX-Luxury Rolex Watch', 'Luxury Rolex watch', 'ROLEX-001', 2, 9999.99, '../../../assets/images/products/rolex/1.png', Sexe.MALE, this.brands.find(b => b.name === 'ROLEX')!),
    new Product(9, 'OMEGA-Professional Omega Watch', 'Professional Omega watch', 'OMEGA-001', 3, 7999.99, '../../../assets/images/products/omega/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'OMEGA')!),
    new Product(10, 'Casio-Dore-Index Chiffres Romains-Carre Pour Femmes-LTP-V007G-9BU', 'Reliable Casio watch', 'CASIO-001', 25, 99.99, '../../../assets/images/products/casio/Casio-Dore-index chiffres romains-Carre pour femmes-LTP-V007G-9BU.png', Sexe.MALE, this.brands.find(b => b.name === 'CASIO')!),
    new Product(11, 'RHYTHM-High Quality Rhythm Watch', 'High quality rhythm watch', 'RHYTHM-002', 0, 199.99, '../../../assets/images/products/rhythm/1.png', Sexe.UNISEX, this.brands.find(b => b.name === 'RHYTHM')!),
    new Product(12, 'YEMA-Classic YEMA Watch', 'Classic YEMA watch', 'YEMA-002', 15, 299.99, '../../../assets/images/products/yema/1.png', Sexe.MALE, this.brands.find(b => b.name === 'YEMA')!),
    new Product(13, 'PACO RABANNE-Stylish Paco Rabanne Watch', 'Stylish Paco Rabanne watch', 'PACO-002', 5, 399.99, '../../../assets/images/products/paco rabanne/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'PACO RABANNE')!),
    new Product(14, 'MORGAN-Elegant Morgan Watch', 'Elegant Morgan watch', 'MORGAN-002', 8, 149.99, '../../../assets/images/products/morgan/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'MORGAN')!),
    new Product(15, 'YONGER & BRESSON-Premium Yonger & Bresson Watch', 'Premium Yonger & Bresson watch', 'YB-002', 12, 499.99, '../../../assets/images/products/younger & bresson/1.png', Sexe.MALE, this.brands.find(b => b.name === 'YONGER & BRESSON')!),
    new Product(16, 'DANIEL HECHTER-Exclusive Daniel Hechter Watch', 'Exclusive Daniel Hechter watch', 'DH-002', 7, 559.99, '../../../assets/images/products/daniel hechter/1.png', Sexe.MALE, this.brands.find(b => b.name === 'DANIEL HECHTER')!),
    new Product(17, 'FESTINA-Sporty Festina Watch', 'Sporty Festina watch', 'FESTINA-002', 20, 269.99, '../../../assets/images/products/festina/1.png', Sexe.MALE, this.brands.find(b => b.name === 'FESTINA')!),
    new Product(18, 'ROLEX-Luxury Rolex Watch', 'Luxury Rolex watch', 'ROLEX-002', 2, 9999.99, '../../../assets/images/products/rolex/1.png', Sexe.MALE, this.brands.find(b => b.name === 'ROLEX')!),
    new Product(19, 'OMEGA-Professional Omega Watch', 'Professional Omega watch', 'OMEGA-002', 3, 7999.99, '../../../assets/images/products/omega/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'OMEGA')!),
    new Product(20, 'Casio-Dore-Index Chiffres Romains-Carre Pour Femmes-LTP-V007G-9BU', 'Reliable Casio watch', 'CASIO-002', 25, 99.99, '../../../assets/images/products/casio/Casio-Dore-index chiffres romains-Carre pour femmes-LTP-V007G-9BU.png', Sexe.MALE, this.brands.find(b => b.name === 'CASIO')!),
    new Product(21, 'RHYTHM-High Quality Rhythm Watch', 'High quality rhythm watch', 'RHYTHM-003', 0, 199.99, '../../../assets/images/products/rhythm/1.png', Sexe.UNISEX, this.brands.find(b => b.name === 'RHYTHM')!),
    new Product(22, 'YEMA-Classic YEMA Watch', 'Classic YEMA watch', 'YEMA-003', 15, 299.99, '../../../assets/images/products/yema/1.png', Sexe.MALE, this.brands.find(b => b.name === 'YEMA')!),
    new Product(23, 'PACO RABANNE-Stylish Paco Rabanne Watch', 'Stylish Paco Rabanne watch', 'PACO-003', 5, 399.99, '../../../assets/images/products/paco rabanne/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'PACO RABANNE')!),
    new Product(24, 'MORGAN-Elegant Morgan Watch', 'Elegant Morgan watch', 'MORGAN-003', 8, 149.99, '../../../assets/images/products/morgan/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'MORGAN')!),
    new Product(25, 'YONGER & BRESSON-Premium Yonger & Bresson Watch', 'Premium Yonger & Bresson watch', 'YB-003', 12, 499.99, '../../../assets/images/products/younger & bresson/1.png', Sexe.MALE, this.brands.find(b => b.name === 'YONGER & BRESSON')!),
    new Product(26, 'DANIEL HECHTER-Exclusive Daniel Hechter Watch', 'Exclusive Daniel Hechter watch', 'DH-003', 7, 559.99, '../../../assets/images/products/daniel hechter/1.png', Sexe.MALE, this.brands.find(b => b.name === 'DANIEL HECHTER')!),
    new Product(27, 'FESTINA-Sporty Festina Watch', 'Sporty Festina watch', 'FESTINA-003', 20, 269.99, '../../../assets/images/products/festina/1.png', Sexe.MALE, this.brands.find(b => b.name === 'FESTINA')!),
    new Product(28, 'ROLEX-Luxury Rolex Watch', 'Luxury Rolex watch', 'ROLEX-003', 2, 9999.99, '../../../assets/images/products/rolex/1.png', Sexe.MALE, this.brands.find(b => b.name === 'ROLEX')!),
    new Product(29, 'OMEGA-Professional Omega Watch', 'Professional Omega watch', 'OMEGA-003', 3, 7999.99, '../../../assets/images/products/omega/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'OMEGA')!),
    new Product(30, 'Casio-Dore-Index Chiffres Romains-Carre Pour Femmes-LTP-V007G-9BU', 'Reliable Casio watch', 'CASIO-003', 25, 99.99, '../../../assets/images/products/casio/Casio-Dore-index chiffres romains-Carre pour femmes-LTP-V007G-9BU.png', Sexe.MALE, this.brands.find(b => b.name === 'CASIO')!),
    new Product(31, 'FESTINA-Sporty Festina Watch', 'Sporty Festina watch', 'FESTINA-004', 20, 269.99, '../../../assets/images/products/festina/1.png', Sexe.MALE, this.brands.find(b => b.name === 'FESTINA')!),
    new Product(32, 'ROLEX-Luxury Rolex Watch', 'Luxury Rolex watch', 'ROLEX-004', 2, 9999.99, '../../../assets/images/products/rolex/1.png', Sexe.MALE, this.brands.find(b => b.name === 'ROLEX')!),
    new Product(33, 'OMEGA-Professional Omega Watch', 'Professional Omega watch', 'OMEGA-004', 3, 7999.99, '../../../assets/images/products/omega/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'OMEGA')!),
    new Product(34, 'Casio-Dore-Index Chiffres Romains-Carre Pour Femmes-LTP-V007G-9BU', 'Reliable Casio watch', 'CASIO-004', 25, 99.99, '../../../assets/images/products/casio/Casio-Dore-index chiffres romains-Carre pour femmes-LTP-V007G-9BU.png', Sexe.MALE, this.brands.find(b => b.name === 'CASIO')!),
    new Product(35, 'MORGAN-Elegant Morgan Watch', 'Elegant Morgan watch', 'MORGAN-004', 8, 149.99, '../../../assets/images/products/morgan/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'MORGAN')!),
    new Product(36, 'YONGER & BRESSON-Premium Yonger & Bresson Watch', 'Premium Yonger & Bresson watch', 'YB-004', 12, 499.99, '../../../assets/images/products/younger & bresson/1.png', Sexe.MALE, this.brands.find(b => b.name === 'YONGER & BRESSON')!),
    new Product(37, 'DANIEL HECHTER-Exclusive Daniel Hechter Watch', 'Exclusive Daniel Hechter watch', 'DH-004', 7, 559.99, '../../../assets/images/products/daniel hechter/1.png', Sexe.MALE, this.brands.find(b => b.name === 'DANIEL HECHTER')!),
    new Product(38, 'FESTINA-Sporty Festina Watch', 'Sporty Festina watch', 'FESTINA-005', 20, 269.99, '../../../assets/images/products/festina/1.png', Sexe.MALE, this.brands.find(b => b.name === 'FESTINA')!),
    new Product(39, 'ROLEX-Luxury Rolex Watch', 'Luxury Rolex watch', 'ROLEX-005', 2, 9999.99, '../../../assets/images/products/rolex/1.png', Sexe.MALE, this.brands.find(b => b.name === 'ROLEX')!),
    new Product(40, 'OMEGA-Professional Omega Watch', 'Professional Omega watch', 'OMEGA-005', 3, 7999.99, '../../../assets/images/products/omega/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'OMEGA')!),
    new Product(41, 'Casio-Dore-Index Chiffres Romains-Carre Pour Femmes-LTP-V007G-9BU', 'Reliable Casio watch', 'CASIO-005', 25, 99.99, '../../../assets/images/products/casio/Casio-Dore-index chiffres romains-Carre pour femmes-LTP-V007G-9BU.png', Sexe.MALE, this.brands.find(b => b.name === 'CASIO')!),
    new Product(42, 'FESTINA-Sporty Festina Watch', 'Sporty Festina watch', 'FESTINA-006', 20, 269.99, '../../../assets/images/products/festina/1.png', Sexe.MALE, this.brands.find(b => b.name === 'FESTINA')!),
    new Product(43, 'ROLEX-Luxury Rolex Watch', 'Luxury Rolex watch', 'ROLEX-006', 2, 9999.99, '../../../assets/images/products/rolex/1.png', Sexe.MALE, this.brands.find(b => b.name === 'ROLEX')!),
    new Product(44, 'OMEGA-Professional Omega Watch', 'Professional Omega watch', 'OMEGA-006', 3, 7999.99, '../../../assets/images/products/omega/1.png', Sexe.FEMALE, this.brands.find(b => b.name === 'OMEGA')!),
  ];
}


createProduct(product: Partial<Product>): Observable<number> {
  const newId = Math.max(...this.products.map(p => p.id)) + 1;
  const newProduct = { ...product, id: newId } as Product;
  this.products.push(newProduct);
  return of(newId);
}

getProductById(productId: number): Observable<Product> {
  return of(this.products.find(p => p.id === productId)!);
}

getAllProducts(): Observable<Product[]> {
  return of(this.products);
}

deleteProduct(productId: number): Observable<void> {
  this.products = this.products.filter(p => p.id !== productId);
  return of(void 0);
}

updateProduct(productId: number, product: Partial<Product>): Observable<number> {
  const index = this.products.findIndex(p => p.id === productId);
  if (index !== -1) {
    this.products[index] = { ...this.products[index], ...product };
  }
  return of(productId);
}

getProductByReference(reference: string): Observable<Product | undefined> {
  return of(this.products.find(p => p.reference === reference));
}

getProductsByIds(ids: number[]): Observable<Product[]> {
  return of(this.products.filter(p => ids.includes(p.id)));
}

getProductsByBrand(brandId: number): Observable<Product[]> {
  return of(this.products.filter(p => p.brand.id === brandId));
}

checkProductAvailability(productId: number, quantity: number): Observable<boolean> {
  const product = this.products.find(p => p.id === productId);
  return of(product ? product.availableQuantity >= quantity : false);
}

updateProductsQuantity(purchases: Array<{ product_id: number, quantity: number }>): Observable<boolean> {
  purchases.forEach(purchase => {
    const product = this.products.find(p => p.id === purchase.product_id);
    if (product) {
      product.availableQuantity -= purchase.quantity;
    }
  });
  return of(true);
}
}