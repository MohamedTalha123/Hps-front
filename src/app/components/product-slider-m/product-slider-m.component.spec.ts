import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSliderMComponent } from './product-slider-m.component';

describe('ProductSliderMComponent', () => {
  let component: ProductSliderMComponent;
  let fixture: ComponentFixture<ProductSliderMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSliderMComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSliderMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
