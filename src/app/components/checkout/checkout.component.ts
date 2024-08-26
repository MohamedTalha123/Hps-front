import { Component, Inject, OnInit } from '@angular/core';
import { CheckoutService } from "../../services/checkout.service";
import { environment } from '../../../../environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KeycloakService } from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  stripe = Stripe(environment.stripePublishableKey);
  otpSent: boolean = false;
  cardElement: any;
  displayError: any;
  elements!: any;
  otpMsg!: string;

  constructor(
    private checkoutService: CheckoutService,
    public dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public secretKey: string,
    private keycloakService: KeycloakService  // Inject KeycloakService
  ) {}

  ngOnInit(): void {
    this.otpSent = false;
    if (this.secretKey) {
      this.setupStripePaymentForm();
    }
  }

  private setupStripePaymentForm() {
    const appearance = {
      theme: 'night',
      labels: 'floating'
    };
    this.elements = this.stripe.elements({ clientSecret: this.secretKey, appearance: appearance });
    this.cardElement = this.elements.create('payment');
    this.cardElement.mount('#card-element');
    this.cardElement.on('change', (event: any) => {
      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError.textContent = "";
      } else if (event.error) {
        this.displayError.textContent = event.error.message;
      }
    });
  }

  payBill() {
    const phoneNumber = this.keycloakService.profile?.phone || 'default-phone-number';
    console.log("the phone number is:::::"+this.keycloakService.profile?.phone);
    
    this.checkoutService.payBill({ phone: phoneNumber }).subscribe(response => {
      console.log('paybill response: ' + response?.message);
      this.otpSent = true;
    });
  }

  onOtpChange(data: string) {
    this.otpMsg = data;
  }

  onSubmitOtp() {
    this.checkoutService.confirmBillPayment(this.otpMsg).subscribe(
      response => {
        console.log('confirmPayment response: ' + response.message);
        this.stripe.confirmPayment({
          elements: this.elements,
          confirmParams: {
            return_url: 'http://localhost:4200',
          }
        });
      }
    );
  }
}
