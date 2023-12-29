import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.page.html',
  styleUrls: ['./forgot-pwd.page.scss'],
})
export class ForgotPwdPage {
  phoneNumber: string = '';
  otpCode: string = '';
  isButtonDisabled: boolean = false;
  showVerifyCard: boolean = false;

  constructor(private alertController: AlertController, private router: Router) { }

  async sendOTP() {
    if (this.phoneNumber.trim() === '') {
      return;
    }

    this.isButtonDisabled = true;
    console.log(`Sending OTP to ${this.phoneNumber}`);
    const alert = await this.alertController.create({
      header: 'OTP Sent!',
      message: `OTP sent to ${this.phoneNumber}`,
      buttons: ['OK'],
    });

    await alert.present();

    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 60000);
    this.showVerifyCard = true;
  }

  async verifyOTP() {
    console.log(`Verifying OTP: ${this.otpCode}`);
    const correctOTP = '1234';
    if (this.otpCode === correctOTP) {
      this.router.navigate(['/reset-password']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Incorrect OTP',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
