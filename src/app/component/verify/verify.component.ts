import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VerifyUserService } from 'src/app/services/verify-user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  private _resendTime = 180000;
  public otpData: any = null;
  public otpTime: string = '';
  public disabledResendOtp: boolean = true;
  public resendOtpClkCount: number = 0;
  public isFormView: boolean = true;
  public verifyForm: FormGroup = this._fb.group({
    city: ['', Validators.required],
    panNumber: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}'),
      ],
    ],
    fullName: ['', [Validators.required, Validators.maxLength(140)]],
    email: [
      '',
      [Validators.required, Validators.maxLength(255), Validators.email],
    ],
    mobile: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[6-9]\d{9}$/gi),
      ],
    ],
    otp: [
      '',
      [
        Validators.required,
        Validators.maxLength(4),
        Validators.pattern('[0-9][0-9][0-9][0-9]'),
      ],
    ],
  });
  constructor(
    private _fb: FormBuilder,
    private _verifyUserService: VerifyUserService
  ) {}

  ngOnInit(): void {
    this.verifyForm.controls['mobile'].valueChanges.subscribe((value: any) => {
      this.getOtp(false);
    });

    this.verifyForm.statusChanges.subscribe((formStatus: string) => {
      if (formStatus === 'VALID') {
        this._verifyOTP();
      }
    });
  }

  public getOtp(isResendOtpClicked: boolean): void {
    if (isResendOtpClicked) {
      this.resendOtpClkCount++;
    }
    if (
      !this.verifyForm.get('city')?.errors &&
      !this.verifyForm.get('panNumber')?.errors &&
      !this.verifyForm.get('fullName')?.errors &&
      !this.verifyForm.get('email')?.errors &&
      !this.verifyForm.get('mobile')?.errors
    ) {
      this.disabledResendOtp = true;
      this.calTime(this._resendTime);
      this._verifyUserService
        .getOtp(this.verifyForm.value)
        .subscribe((data: any) => {
          this.otpData = data;
        });
    }
  }

  private calTime(myDuration: number): void {
    let interval: any = setInterval(() => {
      if (myDuration > 0) {
        myDuration = myDuration - 1000;
        this.otpTime =
          '0' +
          (Math.floor(myDuration / (1000 * 60)) % 60) +
          ':' +
          (Math.floor(myDuration / 1000) % 60);
      } else {
        clearInterval(interval);
        this.disabledResendOtp = false;
        this.otpTime = '';
      }
    }, 1000);
  }
  private _verifyOTP(): void {
    this._verifyUserService
      .verifyOTP({
        mobile: this.verifyForm.value.mobile,
        otp: this.verifyForm.value.otp,
      })
      .subscribe((data: any) => {
        if (data.status == 'Success') {
          this.isFormView = false;
        }
      });
  }
}
