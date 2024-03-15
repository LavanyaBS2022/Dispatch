import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
import { Toast } from '@capacitor/toast';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  token: any;
  name: any;
  loginForm!: FormGroup<any>;

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService, private sharedService: SharedService,private toastController:ToastController) {
    this.loginForm = this.fb.group({
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async submitLoginForm() {
    let postData = JSON.parse(JSON.stringify(this.loginForm.value));
    this.apiService.postAuthentication('/login/authenticateMobile', postData).subscribe(
      async (response: any) => {
        if (response.status === true) {
          await this.router.navigate(['/dispatch-details']);
          this.sharedService.setToken(response.data.token);
          this.sharedService.setName(response.data.name);
          this.sharedService.setNumber(response.data.mobile);
        } else {
          console.log('Login unsuccessful:', response);

          if (response.trace === ' No User Exists') {
            await Toast.show({
              text: 'Incorrect mobile number or password. Please try again.',
              duration: 'long'
            });
          } else {
            await Toast.show({
              text: 'An error occurred. Please try again later.',
              duration: 'long'
            });
          }
        }
      },
      async (error) => {
        console.error('API Error:', error);
        await Toast.show({
          text: 'An error occurred. Please try again later.',
          duration: 'long'
        });
      }
    );
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Incorrect mobile number or password. Please try again.',
      duration: 1500,
      position: position,
      color:'#ffff',
      animated: true
    });

    await toast.present();
  }
}
