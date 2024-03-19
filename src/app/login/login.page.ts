import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
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
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService, private sharedService: SharedService,private toastController:ToastController) {
    this.loginForm = this.fb.group({
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  async submitLoginForm(position: 'top' | 'middle' | 'bottom') {
    let postData = JSON.parse(JSON.stringify(this.loginForm.value));
    this.apiService.postAuthentication('/login/authenticateMobile', postData).subscribe(
      async (response: any) => {
        if (response.status === true) {
          this.sharedService.setToken(response.data.token);
          this.sharedService.setName(response.data.name);
          this.sharedService.setNumber(response.data.mobile);
          await this.router.navigate(['/dispatch-details']);
        } else {
          console.log('Login unsuccessful:', response);

          if (response.trace === ' No User Exists') {
            const toast = await this.toastController.create({
              message: 'Incorrect mobile number or password. Please try again.',
              duration: 2000,
              position: position,
              color:'secondary',
              animated: true
            });  
            await toast.present();      
          } else {
            const toast = await this.toastController.create({
              message: 'An error occurred. Please try again later.',
              duration:2000,
              color:'warning',
            });
            await toast.present();
          }
        }
      },
    
      async (error) => {
        console.error('API Error:', error);
        const toast = await this.toastController.create({
          message: 'An error occurred.Please try again later.',
          duration: 2000,
          position: position,
          color:'warning',
          animated: true
        });  
        await toast.present();      
      }
    );
  }


}
