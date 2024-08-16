import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSliderFComponent } from './product-slider-f.component';

describe('ProductSliderFComponent', () => {
  let component: ProductSliderFComponent;
  let fixture: ComponentFixture<ProductSliderFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSliderFComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSliderFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
