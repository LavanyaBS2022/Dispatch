import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  standalone:true,
  imports: [IonicModule,CommonModule,MaterialModule],
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent{
  @Input() name!: string;
  @Input() mobileNo!: string;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}
