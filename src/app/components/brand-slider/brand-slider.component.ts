import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-brand-slider',
  templateUrl: './brand-slider.component.html',
  styleUrls: ['./brand-slider.component.css']
})
export class BrandSliderComponent implements OnInit, AfterViewInit {
  @ViewChild('slider') sliderRef!: ElementRef;

  brands = [
    { name: 'CASIO', logo: '../../../assets/images/brand/casio.png' },
    { name: 'OMEGA', logo: '../../../assets/images/brand/omega.png' },
    { name: 'ROLEX', logo: '../../../assets/images/brand/rolex.png' },
    { name: 'FESTINA', logo: '../../../assets/images/brand/festina.png' },
    { name: 'DANIEL HECHTER', logo: '../../../assets/images/brand/daniel-hechter.png' },
    { name: 'YONGER & BRESSON', logo: '../../../assets/images/brand/yonger-bresson.png' },
    { name: 'MORGAN', logo: '../../../assets/images/brand/morgan.png' },
    { name: 'PACO RABANNE', logo: '../../../assets/images/brand/paco-rabanne.png' },
    { name: 'YEMA', logo: '../../../assets/images/brand/yema.png' },
    { name: 'RHYTHM', logo: '../../../assets/images/brand/rhythm.png' },
  ];
  imageItems = [
    { name: 'MEN', imageUrl: '../../../assets/images/men watch.png' },
    { name: 'WOMEN', imageUrl: '../../../assets/images/women watch.png' }
  ];


  itemsToShow = 4;
  currentIndex = 0;
  itemWidth = 0;
  isDragging = false;
  startX = 0;
  startScrollLeft = 0;
  isTransitioning = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.updateItemsToShow();
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
  }

  updateItemsToShow() {
    this.itemsToShow = window.innerWidth < 768 ? 3 : 4;
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

  private updateSliderPosition(animate: boolean): void {
    const sliderElement = this.sliderRef.nativeElement;
    const totalItems = this.brands.length;

    if (animate) {
      this.isTransitioning = true;
      this.renderer.setStyle(sliderElement, 'transition', 'transform 0.3s ease');
    } else {
      this.renderer.setStyle(sliderElement, 'transition', 'none');
    }

    let newPosition = -this.currentIndex * this.itemWidth;
    this.renderer.setStyle(sliderElement, 'transform', `translateX(${newPosition}px)`);

    if (this.currentIndex < 0 || this.currentIndex >= totalItems) {
      setTimeout(() => {
        this.renderer.setStyle(sliderElement, 'transition', 'none');
        if (this.currentIndex < 0) {
          this.currentIndex = totalItems - 1;
        } else if (this.currentIndex >= totalItems) {
          this.currentIndex = 0;
        }
        newPosition = -this.currentIndex * this.itemWidth;
        this.renderer.setStyle(sliderElement, 'transform', `translateX(${newPosition}px)`);

        // Force a reflow before re-enabling transitions
        sliderElement.offsetHeight;
        this.renderer.setStyle(sliderElement, 'transition', 'transform 0.3s ease');
        this.isTransitioning = false;
      }, 300);
    } else {
      setTimeout(() => {
        this.isTransitioning = false;
      }, 300);
    }
  }

  onMouseDown(event: MouseEvent): void {
    if (!this.isTransitioning) {
      this.isDragging = true;
      this.startX = event.pageX - this.sliderRef.nativeElement.offsetLeft;
      this.startScrollLeft = this.currentIndex * this.itemWidth;
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
    const totalWidth = this.itemWidth * this.brands.length;

    // Implement circular scrolling
    if (newPosition < 0) {
      newPosition += totalWidth;
    } else if (newPosition >= totalWidth) {
      newPosition -= totalWidth;
    }

    this.currentIndex = Math.round(newPosition / this.itemWidth);
    this.renderer.setStyle(this.sliderRef.nativeElement, 'transform', `translateX(${-newPosition}px)`);
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.renderer.setStyle(this.sliderRef.nativeElement, 'cursor', 'grab');
    this.updateSliderPosition(true);
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
