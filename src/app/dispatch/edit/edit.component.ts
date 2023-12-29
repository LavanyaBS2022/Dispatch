import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent  {
  @Input() rowData: any;
  @Input() tableHeaders: string[]=[];

  constructor(private modalController: ModalController) {
  }

  saveChanges() {
    this.modalController.dismiss();
  }
}
