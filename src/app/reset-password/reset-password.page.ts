import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { SignupPage } from '../signup/signup.page';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  pwd: string = '';
  confirmPassword: string = '';
  mobileNumber: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private apiService:ApiService,
    private route: ActivatedRoute
      ) {}

      ngOnInit() {
        this.route.queryParams.subscribe((params) => {
          this.mobileNumber = params['mobile'];
        });
      }
  async submitReset() {
    debugger
    if (this.pwd === this.confirmPassword) {
      console.log('Password reset successful!');
      await this.presentSuccessAlert();
    } else {
      console.error('Passwords do not match');
      await this.presentAlert('Error', 'Passwords do not match');
    }
    const requestBody = {
      mobile: this.mobileNumber,
      pwd: this.pwd
    };
    try {
      const response = await this.apiService.postAuthentication('/login/password', requestBody).toPromise();
     console.log("response",response)
      if (response.status === true) {
        this.router.navigate(['/reset-password']);
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

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Password Updated',
      message: 'Password updated successfully!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async verifyOTP() {
    debugger
    const requestBody = {
      mobile: this.mobileNumber,
      pwd: this.pwd
    };
    try {
      const response = await this.apiService.postAuthentication('/login/validateOtp', requestBody).toPromise();

      if (response.status === true) {
        this.router.navigate(['/reset-password']);
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
