import { Component, Inject, OnInit } from '@angular/core';
import { OtpService } from '../../services/otp.service';
import { CheckoutService } from '../../services/checkout.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent {
  otpMsg !: string;


  constructor(private checkoutService: CheckoutService,  public dialogRef: MatDialogRef<OtpVerificationComponent>, @Inject(MAT_DIALOG_DATA) public data: {stripe : any, elements: any}, ) {
  }

  ngOnInit(): void {
    console.log('stripe ' + JSON.stringify(this.data.stripe));
    console.log('elememtt  ' +  JSON.stringify(this.data.elements));
  }

  onSubmitOtp(): void {
    this.checkoutService.confirmBillPayment(this.otpMsg).subscribe(
      response => {
        this.data.stripe.confirmPayment({
          elements: JSON.parse(JSON.stringify(this.data.elements)),
          confirmParams: {
            return_url: 'http://localhost:4200',
          }
        });
      }
    );  }


  onOtpChange(data: string){
    this.otpMsg = data;

  }

}

