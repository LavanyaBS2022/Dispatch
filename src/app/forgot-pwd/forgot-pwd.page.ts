import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.page.html',
  styleUrls: ['./forgot-pwd.page.scss'],
})
export class ForgotPwdPage {
  // phoneNumber: string = '';
  // otpCode: string = '';
  // isButtonDisabled: boolean = false;
  // showVerifyCard: boolean = false;

  // constructor(private alertController: AlertController, private router: Router) { }

  // async sendOTP() {
  //   if (this.phoneNumber.trim() === '') {
  //     return;
  //   }

  //   this.isButtonDisabled = true;
  //   console.log(`Sending OTP to ${this.phoneNumber}`);
  //   const alert = await this.alertController.create({
  //     header: 'OTP Sent!',
  //     message: `OTP sent to ${this.phoneNumber}`,
  //     buttons: ['OK'],
  //   });

  //   await alert.present();

  //   setTimeout(() => {
  //     this.isButtonDisabled = false;
  //   }, 60000);
  //   this.showVerifyCard = true;
  // }

  // async verifyOTP() {
  //   console.log(`Verifying OTP: ${this.otpCode}`);
  //   const correctOTP = '1234';
  //   if (this.otpCode === correctOTP) {
  //     this.router.navigate(['/reset-password']);
  //   } else {
  //     const alert = await this.alertController.create({
  //       header: 'Error',
  //       message: 'Incorrect OTP',
  //       buttons: ['OK'],
  //     });
  //     await alert.present();
  //   }
  // }

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
