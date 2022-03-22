import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerifyUserService {
  private GET_OTP_API_URL = `http://apps.thinkoverit.com/api/getOTP.php`;
  private VERIFY_OTP_URL = `http://apps.thinkoverit.com/api/verifyOTP.php`;
  constructor(private _http: HttpClient) {}

  public getOtp(formData: any): Observable<any> {
    return this._http.post(this.GET_OTP_API_URL, formData);
  }

  public verifyOTP(params: any): Observable<any> {
    return this._http.post(this.VERIFY_OTP_URL, params);
  }
}
