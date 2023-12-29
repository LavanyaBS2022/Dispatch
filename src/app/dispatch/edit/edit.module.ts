import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EditComponent } from './edit.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [EditComponent],
  imports: [CommonModule,IonicModule,MaterialModule],
  exports: [EditComponent],
})
export class EditModule {}
