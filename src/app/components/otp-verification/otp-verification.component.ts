import { Component, OnInit } from '@angular/core';
import { OtpService } from '../../services/otp.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent {
  otpMsg !: string;


  constructor(private otpService: OtpService) {
  }

  ngOnInit(): void {

  }

  submit(): void {
    //this.otpService.confirmPayment(this.otpMsg).subscribe();
  }


  onOtpChange(data: string){
    this.otpMsg = data;

  }

}

