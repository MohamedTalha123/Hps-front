// src/app/components/checkout/checkout.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckoutService } from "../../services/checkout.service";

import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
/// <reference path="../../../typings.d.ts" />
export class CheckoutComponent implements OnInit {

  stripe = Stripe(environment.stripePublishableKey);

  secretKey !: string;

  amount !: number;

  cardElement: any;

  displayError: any;

  elements !: any;

  otpMsg !: string;

  constructor(private checkoutService: CheckoutService) {
  }

  ngOnInit(): void {
    this.secretKey = history.state.secretKey;
    this.amount = history.state.amount;

    if ('secret keyy !!!  ' + this.secretKey) {
      console.log(this.secretKey);
      this.setupStripePaymentForm();
    }
  }

  private setupStripePaymentForm() {
    const appearance = {
      theme: 'night',
      labels: 'floating'
    };
    this.elements = this.stripe.elements({ clientSecret: this.secretKey, appearance: appearance });
    console.log(this.secretKey);
    this.cardElement = this.elements.create('payment');
    this.cardElement.mount('#card-element');
    this.cardElement.on('change', (event: any) => {
      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError.textContent = "";
      } else if (event.error) {
        this.displayError.textContent = event.error.mssage;
      }
    });
  }
  payBill() {
    this.checkoutService.payBill({ phone: '0616061968' }).subscribe(response => {
      console.log('paybill resp ++ ' + response);
    }
    );
  }

  onOtpChange(data: string) {
    this.otpMsg = data;

  }

  onSubmitOtp() {
    this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: 'http://localhost/4200',
      }
    });

    this.checkoutService.confirmBillPayment(this.otpMsg).subscribe(
      response => {
        console.log('confirmPayment res ++ ' + response);
        
        this.stripe.confirmCardPayment(this.secretKey,
          {
            payment_method: {
              card: this.cardElement
            }
          })
      })
  }

}