import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CheckoutService } from "../../services/checkout.service";
import { environment } from '../../../../environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('cardElement') cardElement!: ElementRef;

  stripe: any;
  elements: any;
  card: any;
  showProfile: boolean = false;
  errorMessage: string | null = null;
  otpMsg: string = '';

  constructor(
    private checkoutService: CheckoutService,
    public dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public secretKey: string,
    private keycloakService: KeycloakService
  ) {
    this.stripe = Stripe(environment.stripePublishableKey);
  }

  ngOnInit(): void {
    if (this.secretKey) {
      this.setupStripePaymentForm();
    }
  }

  ngAfterViewInit() {
    this.setupStripePaymentForm();
  }

  private setupStripePaymentForm() {
    const appearance = {
      theme: 'stripe',
    };
    this.elements = this.stripe.elements({ clientSecret: this.secretKey, appearance });
    this.card = this.elements.create('card');
    this.card.mount('#card-element');

    this.card.on('change', (event: any) => {
      const displayError = document.getElementById('card-errors');
      if (displayError) {
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      }
    });
  }

  async payBill() {
    const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.secretKey, {
      payment_method: {
        card: this.card,
      }
    });

    if (error) {
      this.showError(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      const phoneNumber = this.keycloakService.profile?.phone || 'default-phone-number';
      this.checkoutService.payBill({ phone: phoneNumber }).subscribe(response => {
        console.log('paybill response: ' + response?.message);
        this.showProfile = true;
      });
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  goBack() {
    this.showProfile = false;
  }

  onOtpChange(data: string) {
    this.otpMsg = data;
  }

  onSubmitOtp() {
    this.checkoutService.confirmBillPayment(this.otpMsg).subscribe(
      response => {
        console.log('confirmPayment response: ' + response.message);
        // Handle successful payment confirmation
        this.dialogRef.close(true);
      },
      error => {
        this.showError('Failed to confirm payment. Please try again.');
      }
    );
  }
}
//old code from here


// import { Component, Inject, OnInit } from '@angular/core';
// import { CheckoutService } from "../../services/checkout.service";
// import { environment } from '../../../../environments/environment';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { KeycloakService } from '../../services/keycloak/keycloak.service';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css']
// })
// export class CheckoutComponent implements OnInit {

//   stripe = Stripe(environment.stripePublishableKey);
//   otpSent: boolean = false;
//   cardElement: any;
//   displayError: any;
//   elements!: any;
//   otpMsg!: string;

//   constructor(
//     private checkoutService: CheckoutService,
//     public dialogRef: MatDialogRef<CheckoutComponent>,
//     @Inject(MAT_DIALOG_DATA) public secretKey: string,
//     private keycloakService: KeycloakService  // Inject KeycloakService
//   ) {}

//   ngOnInit(): void {
//     this.otpSent = false;
//     if (this.secretKey) {
//       this.setupStripePaymentForm();
//     }
//   }

//   private setupStripePaymentForm() {
//     const appearance = {
//       theme: 'night',
//       labels: 'floating'
//     };
//     this.elements = this.stripe.elements({ clientSecret: this.secretKey, appearance: appearance });
//     this.cardElement = this.elements.create('payment');
//     this.cardElement.mount('#card-element');
//     this.cardElement.on('change', (event: any) => {
//       this.displayError = document.getElementById('card-errors');

//       if (event.complete) {
//         this.displayError.textContent = "";
//       } else if (event.error) {
//         this.displayError.textContent = event.error.message;
//       }
//     });
//   }

//   payBill() {
//     const phoneNumber = this.keycloakService.profile?.phone || 'default-phone-number';
//     console.log("the phone number is:::::"+this.keycloakService.profile?.phone);
    
//     this.checkoutService.payBill({ phone: phoneNumber }).subscribe(response => {
//       console.log('paybill response: ' + response?.message);
//       this.otpSent = true;
//     });
//   }

//   onOtpChange(data: string) {
//     this.otpMsg = data;
//   }

//   onSubmitOtp() {
//     this.checkoutService.confirmBillPayment(this.otpMsg).subscribe(
//       response => {
//         console.log('confirmPayment response: ' + response.message);
//         this.stripe.confirmPayment({
//           elements: this.elements,
//           confirmParams: {
//             return_url: 'http://localhost:4200',
//           }
//         });
//       }
//     );
//   }
// }

//to here