import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../entity/brand';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('footerContent') footerContent!: ElementRef;
  @ViewChild('brandsDropdown') brandsDropdown!: ElementRef;
  isBrandsDropdownVisibleInFooter = false;
  private resizeObserver: ResizeObserver | null = null;
  brands: Brand[] = [];

  constructor(private cdr: ChangeDetectorRef,    private brandService: BrandService, private router: Router) {}

  ngOnInit() {
    this.loadBrands();
  }

  ngAfterViewInit() {
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    this.cleanupResizeObserver();
  }

  loadBrands() {
    this.brandService.getAllBrands().subscribe(
      (brands: Brand[]) => {
        this.brands = brands;
      },
      error => {
        console.error('Error loading brands:', error);
      }
    );
  }

  navigateTo(route: string, filter?: { type: string, value: any }) {
    if (filter) {
      this.router.navigate([route], { queryParams: { [filter.type]: filter.value } });
    } else {
      this.router.navigate([route]);
    }
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
