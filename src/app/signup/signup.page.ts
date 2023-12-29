import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  userName: string='';
  email: string='';
  phoneNumber: string='';
  password: string='';
  confirmPassword: string='';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async presentAlert(header: string,message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  signUp() {
    if (!this.userName  || !this.email || !this.phoneNumber || !this.password || !this.confirmPassword) {
      this.presentAlert('Error', 'Please fill in all fields.');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.presentAlert('Error', 'Passwords do not match.');
      return;
    }
    this.router.navigate(['/login']);
  }
}
