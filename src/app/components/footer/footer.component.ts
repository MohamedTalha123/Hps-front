import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('footerContent') footerContent!: ElementRef;
  @ViewChild('brandsDropdown') brandsDropdown!: ElementRef;
  isBrandsDropdownVisibleInFooter = false;
  private resizeObserver: ResizeObserver | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    this.cleanupResizeObserver();
  }

  showBrandsDropdown() {
    this.isBrandsDropdownVisibleInFooter = true;
    // this.cdr.detectChanges();

  }

  hideBrandsDropdown() {
    this.isBrandsDropdownVisibleInFooter = false;
        // this.cdr.detectChanges();

  }

  private setupResizeObserver() {
    if (this.footerContent && !this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateFooterHeight();
      });
      this.resizeObserver.observe(this.footerContent.nativeElement);
    }
  }

  private cleanupResizeObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  private updateFooterHeight() {
    if (this.footerContent) {
      const contentHeight = Array.from(this.footerContent.nativeElement.children as HTMLCollection)
        .reduce((total, child) => {
          return total + (child as HTMLElement).offsetHeight;
        }, 0);
      this.footerContent.nativeElement.style.height = `${contentHeight}px`;
      this.cdr.detectChanges();
    }
  }
}
