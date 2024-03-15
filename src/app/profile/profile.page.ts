import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  fullName: string;
  email: string;

  constructor() {
    // Initialize user profile data here (e.g., retrieve from a service)
    this.fullName = 'John Doe';
    this.email = 'john@example.com';
  }

  saveProfile() {
    // Logic to save user profile data (e.g., call a service to update data)
    console.log('Saving profile...');
  }

}
