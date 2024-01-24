import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  token:any;
  name:any;
  loginForm!: FormGroup<any>;

  constructor(private fb: FormBuilder,private router: Router,private apiService: ApiService,private sharedService:SharedService) {
    this.loginForm = this.fb.group({
      mobile: ['', Validators.required], 
      password: ['', Validators.required]
    });
  }
  
  submitLoginForm() {
    let postData = JSON.parse(JSON.stringify(this.loginForm.value));
    this.apiService.postAuthentication('/login/authenticateMobile', postData).subscribe(
      (response: any) => {
        if (response.status === true) {
          this.router.navigate(['/dispatch']);
            this.sharedService.setToken(response.data.token); 
            this.sharedService.setName(response.data.name) ;
        } else {
          console.log('Login unsuccessful:', response);
          
          if (response.errorCode === 'INVALID_CREDENTIALS') {
            alert('Incorrect mobile number or password. Please try again.');
          } else {
            alert('An error occurred. Please try again later.');
          }
        }
      },
      (error) => {
        console.error('API Error:', error);
        alert('An error occurred. Please try again later.');
      }
    );
  }


  // async login() {
  //   if (!this.email || !this.password) {
  //     this.presentAlert('Please enter both email and password.');
  //     return;
  //   }

  //   const isValidUser = this.validateUser(this.email, this.password);

  //   if (isValidUser) {
  //     this.router.navigate(['/dispatch']);
  //   } else {
  //     this.presentAlert('Username does not exist or password is incorrect.');
  //   }
  // }

  // validateUser(email: string, password: string): boolean {
  //   return email === 'abc@123' && password === 'password';
  // }

  // async presentAlert(message: string) {
  //   const alert = await this.alertController.create({
  //     header: 'Alert',
  //     message: message,
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }
  
}
