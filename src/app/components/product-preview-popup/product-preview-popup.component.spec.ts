import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPreviewPopupComponent } from './product-preview-popup.component';

describe('ProductPreviewPopupComponent', () => {
  let component: ProductPreviewPopupComponent;
  let fixture: ComponentFixture<ProductPreviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductPreviewPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductPreviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
