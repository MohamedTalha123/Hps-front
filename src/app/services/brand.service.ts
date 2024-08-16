import { Injectable } from '@angular/core';
import { Brand } from '../entity/brand';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private brands: Brand[] = [
    new Brand(
      1,
      'CASIO',
      'Known for their durability and innovation, Casio watches blend functionality with style. From digital to analog, they offer a wide range of timepieces suitable for every occasion.',
      '../../../assets/images/about-us/casio.png',
    ),
    new Brand(
      2,
      'OMEGA',
      'Omega is synonymous with luxury and precision. Their watches have been worn on the moon and in James Bond films, embodying both adventure and sophistication.',
      '../../../assets/images/about-us/omega.png',
    ),
    new Brand(
      3,
      'ROLEX',
      'Rolex stands at the pinnacle of luxury watchmaking. Each timepiece is a masterpiece of engineering and design, symbolizing success and excellence.',
      '../../../assets/images/about-us/rolex.png',
    ),
    new Brand(
      4,
      'FESTINA',
      'Festina combines Swiss precision with contemporary design. Their watches are perfect for those who appreciate both style and functionality in their timepieces.',
      '../../../assets/images/about-us/festina.png',
    ),
    new Brand(
      5,
      'DANIEL HECHTER',
      'Daniel Hechter watches embody Parisian chic. With elegant designs and attention to detail, they offer sophisticated timepieces for the modern individual.',
      '../../../assets/images/about-us/daniel-hechter.png',
    ),
    new Brand(
      6,
      'YONGER & BRESSON',
      'Yonger & Bresson brings French creativity to watchmaking. Their timepieces blend traditional craftsmanship with contemporary aesthetics, offering unique and stylish options.',
      '../../../assets/images/about-us/yonger-bresson.png',
    ),
    new Brand(
      7,
      'MORGAN',
      'Morgan watches capture the essence of French fashion. With trendy designs and affordable luxury, they cater to those who want to make a statement with their timepiece.',
      '../../../assets/images/about-us/morgan.png',
    ),
    new Brand(
      8,
      'PACO RABANNE',
      'Paco Rabanne watches are as avant-garde as the fashion house itself. These timepieces are perfect for those who dare to be different and appreciate bold, innovative designs.',
      '../../../assets/images/about-us/paco-rabanne.png',
    ),
    new Brand(
      9,
      'YEMA',
      'YEMA, a French watchmaking pioneer, is known for its robust and adventurous timepieces. Their watches have accompanied explorers and astronauts, embodying a spirit of discovery.',
      '../../../assets/images/about-us/yema.png',
    ),
    new Brand(
      10,
      'RHYTHM',
      'Rhythm combines Japanese precision with global design influences. Their watches offer reliable timekeeping with a touch of artistic flair, suitable for everyday wear and special occasions.',
      '../../../assets/images/about-us/rhythm.png',
    ),
  ];

  constructor() { }

  createBrand(brand: Partial<Brand>): Observable<number> {
    const newId = Math.max(...this.brands.map(b => b.id)) + 1;
    const newBrand = { ...brand, id: newId } as Brand;
    this.brands.push(newBrand);
    return of(newId);
  }

  getBrandById(brandId: number): Observable<Brand> {
    return of(this.brands.find(b => b.id === brandId)!);
  }

  getAllBrands(): Observable<Brand[]> {
    return of(this.brands);
  }

  deleteBrand(brandId: number): Observable<void> {
    this.brands = this.brands.filter(b => b.id !== brandId);
    return of(void 0);
  }

  updateBrand(brandId: number, brand: Partial<Brand>): Observable<number> {
    const index = this.brands.findIndex(b => b.id === brandId);
    if (index !== -1) {
      const updatedBrand = new Brand(
        this.brands[index].id,
        brand.name || this.brands[index].name,
        brand.description || this.brands[index].description,
        brand.imageURL || this.brands[index].imageURL,
        brand.products || this.brands[index].products
      );
      this.brands[index] = updatedBrand;
    }
    return of(brandId);
  }
}

