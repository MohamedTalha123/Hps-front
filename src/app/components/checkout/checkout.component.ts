// src/app/components/checkout/checkout.component.ts
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CheckoutService} from "../../services/checkout.service";

import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
/// <reference path="../../../typings.d.ts" />
export class CheckoutComponent implements OnInit {
  
  stripe = Stripe(environment.stripePublishableKey);

  @Input() secretKey !: string;

  @Input() amount !: number;
  cardElement : any;

  displayError : any;

  elements !: any;

  constructor(private checkoutService : CheckoutService) {
  }

  ngOnInit(): void {
    // this.secretKeyService.mySubject.subscribe(data => {
    //   this.secretKey = data;
    // })
    if (this.secretKey) {
      console.log(this.secretKey);
      this.setupStripePaymentForm();
    }

  }

  private setupStripePaymentForm() {
    const appearance = {
      theme: 'night',
      labels: 'floating'
    };
    this.elements = this.stripe.elements({clientSecret: this.secretKey, appearance : appearance});
    console.log(this.secretKey);
    this.cardElement = this.elements.create('payment');
    this.cardElement.mount('#card-element');
    this.cardElement.on('change', (event : any) => {
      this.displayError = document.getElementById('card-errors');

      if (event.complete){
        this.displayError.textContent = "";
      } else if (event.error){
        this.displayError.textContent = event.error.mssage;
      }
    });
  }
  // onConfirm(){
  //   this.stripe.confirmPayment({elements : this.elements,
  //     confirmParams: {
  //     return_url: 'http://localhost/4200',
  //   }});
  //   this.checkoutService.chargerSolde(Number(this.amount)).subscribe(response => {
  //       console.log(response);
  //     }
  //   );
  // }
  onSubmit(){
    // this.checkoutService.confirmPayment("confirmationCode").subscribe(
    //   response => {

    //     // this.test = JSON.parse(response?.data?.paymentIntent).client_secret;

    //     this.stripe.confirmCardPayment(JSON.parse(response?.data?.paymentIntent).client_secret,
    //       {
    //         payment_method: {
    //           card: this.cardElement}
    //       })
    //   })
}
}