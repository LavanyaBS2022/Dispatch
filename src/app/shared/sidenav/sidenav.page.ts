import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.page.html',
  styleUrls: ['./sidenav.page.scss'],
})
export class SidenavPage {
name:any
  constructor(private menuController: MenuController,private sharedService:SharedService) {
    this.name=sharedService.getName();
   }

  closeMenu() {
    this.menuController.close();
  }
}
