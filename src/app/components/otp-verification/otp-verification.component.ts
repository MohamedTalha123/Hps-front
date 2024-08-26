import { Component, OnInit } from '@angular/core';
import { OtpService } from '../../services/otp.service';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent {
  otpMsg !: string;


  constructor(private checkoutService: CheckoutService) {
  }

  ngOnInit(): void {}

  submit(): void {
    this.checkoutService.confirmBillPayment(this.otpMsg).subscribe();
  }


  onOtpChange(data: string){
    this.otpMsg = data;

  }

}

