import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  async submitReset() {
    if (this.newPassword === this.confirmPassword) {
      console.log('Password reset successful!');
      await this.presentSuccessAlert();
    } else {
      console.error('Passwords do not match');
      await this.presentAlert('Error', 'Passwords do not match');
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
}
