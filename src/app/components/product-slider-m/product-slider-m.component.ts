import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../entity/product';
import { ProductPreviewPopupComponent } from '../product-preview-popup/product-preview-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-slider-m',
  templateUrl: './product-slider-m.component.html',
  styleUrls: ['./product-slider-m.component.css']
})
export class ProductSliderMComponent implements OnInit, AfterViewInit {
  @ViewChild('slider') sliderRef!: ElementRef;

  MaleProduts: ProductResponse[] = [];
  displayProducts: ProductResponse[] = [];
  itemsToShow = 4;
  currentIndex = 0;
  itemWidth = 0;
  isDragging = false;
  startX = 0;
  startScrollLeft = 0;
  isTransitioning = false;
  clickStartTime = 0;
  clickedItemIndex = -1;

  constructor(
    private renderer: Renderer2,
    private productService: ProductService,
    private dialog: MatDialog,    
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      products => {
        this.MaleProduts = products.filter(product => product.sexe === 'MALE');        this.updateItemsToShow();
        this.updateDisplayProducts();
      },
      error => console.error('Error fetching products:', error)
    );
  }

  ngAfterViewInit(): void {
    this.calculateItemWidth();
    this.updateSliderPosition(false);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateItemsToShow();
    this.calculateItemWidth();
    this.updateSliderPosition(false);
    this.updateDisplayProducts();
  }

  updateItemsToShow() {
    this.itemsToShow = window.innerWidth < 768 ? 2 : 4;
  }

  updateDisplayProducts() {
    const totalProducts = this.MaleProduts.length;
    this.displayProducts = [
      ...this.MaleProduts.slice(-this.itemsToShow),
      ...this.MaleProduts,
      ...this.MaleProduts.slice(0, this.itemsToShow)
    ];
  }

  calculateItemWidth() {
    const sliderElement = this.sliderRef.nativeElement;
    this.itemWidth = sliderElement.offsetWidth / this.itemsToShow;
  }

  scrollLeft(): void {
    if (!this.isTransitioning) {
      this.currentIndex--;
      this.updateSliderPosition(true);
    }
  }

  scrollRight(): void {
    if (!this.isTransitioning) {
      this.currentIndex++;
      this.updateSliderPosition(true);
    }
  }

  openPreviewPopup(product: ProductResponse) {
    this.dialog.open(ProductPreviewPopupComponent, {
      data: product,
      width: '800px'
    });
  }

  navigateToProductPage(product: ProductResponse) {
    this.router.navigate(['/product', product.id]);
  }

  private updateSliderPosition(animate: boolean): void {
    const sliderElement = this.sliderRef.nativeElement;
    const totalItems = this.MaleProduts.length;

    if (animate) {
      this.isTransitioning = true;
      this.renderer.setStyle(sliderElement, 'transition', 'transform 0.3s ease');
    } else {
      this.renderer.setStyle(sliderElement, 'transition', 'none');
    }

    let newPosition = -(this.currentIndex + this.itemsToShow) * this.itemWidth;
    this.renderer.setStyle(sliderElement, 'transform', `translateX(${newPosition}px)`);

    if (this.currentIndex <= -this.itemsToShow) {
      setTimeout(() => {
        this.renderer.setStyle(sliderElement, 'transition', 'none');
        this.currentIndex = totalItems - this.itemsToShow;
        newPosition = -(this.currentIndex + this.itemsToShow) * this.itemWidth;
        this.renderer.setStyle(sliderElement, 'transform', `translateX(${newPosition}px)`);
        sliderElement.offsetHeight; // Force reflow
        this.renderer.setStyle(sliderElement, 'transition', 'transform 0.3s ease');
        this.isTransitioning = false;
      }, 300);
    } else if (this.currentIndex >= totalItems) {
      setTimeout(() => {
        this.renderer.setStyle(sliderElement, 'transition', 'none');
        this.currentIndex = 0;
        newPosition = -this.itemsToShow * this.itemWidth;
        this.renderer.setStyle(sliderElement, 'transform', `translateX(${newPosition}px)`);
        sliderElement.offsetHeight; // Force reflow
        this.renderer.setStyle(sliderElement, 'transition', 'transform 0.3s ease');
        this.isTransitioning = false;
      }, 300);
    } else {
      setTimeout(() => {
        this.isTransitioning = false;
      }, 300);
    }
  }

  onItemMouseDown(event: MouseEvent, index: number): void {
    this.clickStartTime = new Date().getTime();
    this.clickedItemIndex = index;
  }

  onMouseDown(event: MouseEvent): void {
    if (!this.isTransitioning) {
      this.isDragging = true;
      this.startX = event.pageX - this.sliderRef.nativeElement.offsetLeft;
      this.startScrollLeft = (this.currentIndex + this.itemsToShow) * this.itemWidth;
      this.renderer.setStyle(this.sliderRef.nativeElement, 'cursor', 'grabbing');
      this.renderer.setStyle(this.sliderRef.nativeElement, 'transition', 'none');
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.sliderRef.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2;
    let newPosition = this.startScrollLeft - walk;
    const totalWidth = this.itemWidth * this.MaleProduts.length;

    this.currentIndex = Math.round(newPosition / this.itemWidth) - this.itemsToShow;
    this.renderer.setStyle(this.sliderRef.nativeElement, 'transform', `translateX(${-newPosition}px)`);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.renderer.setStyle(this.sliderRef.nativeElement, 'cursor', 'grab');
    this.updateSliderPosition(true);

    const clickEndTime = new Date().getTime();
    const clickDuration = clickEndTime - this.clickStartTime;

    if (clickDuration < 200 && this.clickedItemIndex !== -1) {
      const clickedProduct = this.displayProducts[this.clickedItemIndex];
      this.navigateToProductPage(clickedProduct);
    }

    this.clickedItemIndex = -1;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.renderer.setStyle(this.sliderRef.nativeElement, 'cursor', 'grab');
      this.updateSliderPosition(true);
    }
  }
}
