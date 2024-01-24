import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../shared/services/api.service';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  mobileNumber: string = '';
  showVerifyCard: boolean = false;
  isButtonDisabled: boolean = false;
  otpCode: any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private apiService: ApiService,
    private sharedService: SharedService
  ) { }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async sendOTP1() {
    if (this.mobileNumber.trim() === '') {
      return;
    }
    this.isButtonDisabled = true;
    console.log(`Sending OTP to ${this.mobileNumber}`);
    const alert = await this.alertController.create({
      header: 'OTP Sent!',
      message: `OTP sent to ${this.mobileNumber}`,
      buttons: ['OK'],
    });
    await alert.present();
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 60000);
    this.showVerifyCard = true;
  }

  sendOTP() {
    const requestBody = {
      mobile: this.mobileNumber
    };
    this.apiService.postAuthentication('/login/verifyUser', requestBody).subscribe(
      (response: any) => {
        if (response.status === true) {
          this.sendOTP1();
        } else {
          console.log('Login unsuccessful:', response);
        }
      },
    );
  }

  async verifyOTP() {
    const requestBody = {
      mobile: this.mobileNumber,
      otp: this.otpCode
    };
    try {
      const response = await this.apiService.postAuthentication('/login/validateOtp', requestBody).toPromise();

      if (response.status === true) {
    this.router.navigate(['/reset-password'], {
      queryParams: { mobile: this.mobileNumber },
    });
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Incorrect OTP',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
    }
  }
} 
