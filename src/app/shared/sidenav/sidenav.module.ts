import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SidenavPageRoutingModule } from './sidenav-routing.module';

import { SidenavPage } from './sidenav.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SidenavPageRoutingModule,
    MaterialModule
  ],
  declarations: [SidenavPage]
})
export class SidenavPageModule {}
