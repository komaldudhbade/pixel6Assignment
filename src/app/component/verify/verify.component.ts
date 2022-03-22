import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { VerifyUserService } from 'src/app/services/verify-user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  public mbNumber: string = '';
  public otpData: any = null;
  public disabledResendOtp: boolean = true;
  public resendOtpClkCount: number = 0;
  public isFormView: boolean = true;
  public verifyForm: FormGroup = new FormGroup({
    city: new FormControl(''),
    panNumber: new FormControl(''),
    fullName: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    otp: new FormControl(''),
  });
  constructor(
    private _fb: FormBuilder,
    private _verifyUserService: VerifyUserService
  ) {}

  ngOnInit(): void {
    this.verifyForm = this._fb.group({
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
  }

  private setResendOtpTimer(): void {
    this.disabledResendOtp = true;
    let time = setTimeout(() => {
      this.disabledResendOtp = false;
    }, 3000); //180000
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
      this.setResendOtpTimer();
      this._verifyUserService
        .getOtp(this.verifyForm.value)
        .subscribe((data: any) => {
          this.otpData = data;
        });
    }
  }

  public verifyOTP(): void {
    if (this.verifyForm.valid) {
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
}
