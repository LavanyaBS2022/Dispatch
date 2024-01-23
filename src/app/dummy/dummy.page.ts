import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.page.html',
  styleUrls: ['./dummy.page.scss'],
})
export class DummyPage  {
  captcha:string='';
  generatedCaptcha: string = '';
  userEnteredCaptcha: string = '';
  verificationResult: string | undefined;

  ngOnInit() {
    // Generate the initial CAPTCHA on page load
    this.generatedCaptcha = this.generateRandomString(6);
  }

  verifyCaptcha() {
    // Implement your CAPTCHA validation logic
    if (this.generatedCaptcha === this.userEnteredCaptcha) {
      this.verificationResult = 'CAPTCHA is valid';
    } else {
      this.verificationResult = 'CAPTCHA is not valid';
    }
  }

  private generateRandomString(length: number): string {
    // Implement your logic to generate a random string
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  refreshCaptcha() {
    // Implement your logic to generate a new CAPTCHA code
    this.generatedCaptcha = this.generateRandomString(6);
  }

}


