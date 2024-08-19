import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css']
})
export class ProductCarouselComponent implements AfterViewInit {
  banners = [
    {
      imageUrl: '../../../assets/images/baner/rolex.jpg',
      alt: 'Banner 1',
      title: 'New Collection',
      description: 'Discover our latest arrivals',
      category: 'ROLEX'
    },
    {
      imageUrl: '../../../assets/images/baner/omega.jpg',
      alt: 'Banner 2',
      title: 'Summer Sale',
      description: 'Up to 50% off on selected items',
      category: 'OMEGA'
    },
    {
      imageUrl: '../../../assets/images/baner/tissot.jpg',
      alt: 'tissot',
      title: 'Summer Sale',
      description: 'Up to 50% off on selected items',
      category: 'CASIO'
    },
    {
      imageUrl: '../../../assets/images/baner/casio4.jpg',
      alt: 'casio',
      title: 'Summer Sale',
      description: 'Up to 50% off on selected items',
      category: 'CASIO'
    },
    // Add more banners as needed
  ];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    const carousel = document.getElementById('productCarousel');
    if (carousel) {
      new bootstrap.Carousel(carousel, {
        interval: 5000 // Set this to your desired interval in milliseconds (e.g., 3000 for 3 seconds)
      });
    }
  }

  goToCategory(category: string) {
    this.router.navigate(['/products'], { queryParams: { brand: category } });  }
}