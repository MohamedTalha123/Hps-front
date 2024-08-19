import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../entity/brand';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-brand-slider',
  templateUrl: './brand-slider.component.html',
  styleUrls: ['./brand-slider.component.css'],
  animations: [
    trigger('smoothTransition', [
      transition('* => *', [
        animate('0.5s cubic-bezier(0.25, 0.1, 0.25, 1)')
      ])
    ])
  ]
})
export class BrandSliderComponent implements OnInit, AfterViewInit {
  @ViewChild('slider') sliderRef!: ElementRef;
  imageItems = [
    { name: 'MEN', imageUrl: '../../../assets/images/men watch.png', filter: 'MALE' },
    { name: 'WOMEN', imageUrl: '../../../assets/images/women watch.png', filter: 'FEMALE' }
  ];
  brands: Brand[] = [];
  displayedBrands: Brand[] = [];
  isLoading = false;
  errorMessage = '';

  itemsToShow = 4;
  currentIndex = 0;
  itemWidth = 0;
  isDragging = false;
  startX = 0;
  startScrollLeft = 0;
  currentTranslate = 0;

  constructor(
    private renderer: Renderer2,
    private brandService: BrandService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateItemsToShow();
    this.loadBrands();
  }

  loadBrands(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.brandService.getAllBrands().subscribe(
      (brands: Brand[]) => {
        this.brands = brands;
        this.updateDisplayedBrands();
        this.isLoading = false;
        setTimeout(() => {
          this.calculateItemWidth();
          this.updateSliderPosition(false);
        });
      },
      error => {
        console.error('Error loading brands:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to load brands. Please try again later.';
      }
    );
  }


  ngAfterViewInit(): void {
    this.calculateItemWidth();
    this.updateSliderPosition(false);
  }

  updateItemsToShow() {
    this.itemsToShow = window.innerWidth < 768 ? 3 : 4;
  }

  calculateItemWidth() {
    const sliderElement = this.sliderRef.nativeElement;
    this.itemWidth = sliderElement.offsetWidth / this.itemsToShow;
  }

  scrollLeft(): void {
    this.currentIndex--;
    this.updateDisplayedBrands();
    this.updateSliderPosition(true);
  }

  scrollRight(): void {
    this.currentIndex++;
    this.updateDisplayedBrands();
    this.updateSliderPosition(true);
  }

  updateDisplayedBrands() {
    const totalBrands = this.brands.length;
    this.displayedBrands = [];
    for (let i = -2; i <= this.itemsToShow + 1; i++) {
      const index = ((this.currentIndex + i) % totalBrands + totalBrands) % totalBrands;
      this.displayedBrands.push(this.brands[index]);
    }
  }

  private updateSliderPosition(animate: boolean): void {
    const sliderElement = this.sliderRef.nativeElement;

    if (animate) {
      this.renderer.setStyle(sliderElement, 'transition', 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
    } else {
      this.renderer.setStyle(sliderElement, 'transition', 'none');
    }

    const newPosition = -2 * this.itemWidth;
    this.renderer.setStyle(sliderElement, 'transform', `translateX(${newPosition}px)`);

    if (animate) {
      setTimeout(() => {
        this.renderer.setStyle(sliderElement, 'transition', 'none');
        this.currentIndex = ((this.currentIndex % this.brands.length) + this.brands.length) % this.brands.length;
        this.updateDisplayedBrands();
        this.renderer.setStyle(sliderElement, 'transform', `translateX(${newPosition}px)`);
      }, 500);
    }
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX;
    const sliderElement = this.sliderRef.nativeElement;
    const transform = new WebKitCSSMatrix(window.getComputedStyle(sliderElement).transform);
    this.startScrollLeft = transform.m41;
    this.renderer.setStyle(sliderElement, 'transition', 'none');
    this.renderer.setStyle(sliderElement, 'cursor', 'grabbing');
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.clientX;
    const walk = (x - this.startX);
    const newPosition = this.startScrollLeft + walk;
    this.renderer.setStyle(this.sliderRef.nativeElement, 'transform', `translateX(${newPosition}px)`);
  }

  onMouseUp(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    const sliderElement = this.sliderRef.nativeElement;
    this.renderer.setStyle(sliderElement, 'cursor', 'grab');

    const transform = new WebKitCSSMatrix(window.getComputedStyle(sliderElement).transform);
    const currentPosition = transform.m41;

    const movement = this.startScrollLeft - currentPosition;
    const itemsMoved = Math.round(movement / this.itemWidth);

    this.currentIndex += itemsMoved;
    this.updateDisplayedBrands();

    // Animate to the nearest full brand
    const targetPosition = -2 * this.itemWidth;
    this.animateToPosition(currentPosition, targetPosition);
  }
  private animateToPosition(start: number, end: number): void {
    const sliderElement = this.sliderRef.nativeElement;
    const duration = 500; // milliseconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = this.easeInOutCubic(progress);
      const currentPosition = start + (end - start) * easeProgress;

      this.renderer.setStyle(sliderElement, 'transform', `translateX(${currentPosition}px)`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete, update the displayed brands if needed
        this.currentIndex = ((this.currentIndex % this.brands.length) + this.brands.length) % this.brands.length;
        this.updateDisplayedBrands();
        this.renderer.setStyle(sliderElement, 'transform', `translateX(${end}px)`);
      }
    };

    requestAnimationFrame(animate);
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  onMouseLeave(): void {
    if (this.isDragging) {
      this.onMouseUp();
    }
  }

  navigateToProductList(brand: Brand) {
    this.router.navigate(['/products'], { queryParams: { brand: brand.name } });
  }
  navigateToGenderProducts(filter: string) {
    this.router.navigate(['/products'], { queryParams: { gender: filter } });
  }
}
