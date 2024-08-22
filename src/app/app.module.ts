import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { BrandSliderComponent } from './components/brand-slider/brand-slider.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductPreviewPopupComponent } from './components/product-preview-popup/product-preview-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import { ProductSliderComponent } from './components/product-slider/product-slider.component';
import { ProductSliderMComponent } from './components/product-slider-m/product-slider-m.component';
import { ProductSliderFComponent } from './components/product-slider-f/product-slider-f.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartService } from './services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthService } from './security/AuthService';
import { AuthGuard } from './security/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductCarouselComponent,
    BrandSliderComponent,
    ProductListComponent,
    ProductPreviewPopupComponent,
    ProductPageComponent,
    HomeComponent,
    TestComponent,
    ProductSliderComponent,
    ProductSliderMComponent,
    ProductSliderFComponent,
    FooterComponent,
    AboutUsComponent,
    CartComponent,
    CheckoutComponent,
    AdminPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    
    ReactiveFormsModule,
    HttpClientModule,
     OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8091'],
        sendAccessToken: true,
      },
    }),
 
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    CartService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
