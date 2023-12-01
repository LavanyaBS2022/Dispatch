import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispatchDetailsPageRoutingModule } from './dispatch-details-routing.module';

import { DispatchDetailsPage } from './dispatch-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispatchDetailsPageRoutingModule
  ],
  declarations: [DispatchDetailsPage]
})
export class DispatchDetailsPageModule {}
