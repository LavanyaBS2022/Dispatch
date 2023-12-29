import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-otp-login',
  templateUrl: './otp-login.page.html',
  styleUrls: ['./otp-login.page.scss'],
})
export class OtpLoginPage {
 username: string='';
  otp: string='';
  message: string='';

  constructor(public alertController: AlertController) {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  requestOTP() {
    if (!this.username || this.username.trim() === '') {
      this.presentAlert('Error', 'Please enter your username.');
      return;
    }

    const otp = this.generateOTP();
    this.presentAlert('OTP Sent', `OTP sent to ${this.username}: ${otp}`);
  }

  verifyOTP(generatedOTP:any) {
    if (!this.otp || this.otp.trim() === '') {
      this.presentAlert('Error', 'Please enter OTP.');
      return;
    }

    // const generatedOTP = this.generateOTP();
    console.log(generatedOTP)

    if (this.otp === generatedOTP) {
      this.message = 'OTP Verified. Login successful!';
    } else {
      this.message = 'Invalid OTP. Please try again.';
    }
  }

  generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

}
