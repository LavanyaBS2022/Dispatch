import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.page.html',
  styleUrls: ['./sidenav.page.scss'],
})
export class SidenavPage {

  constructor(private menuController: MenuController) { }

  closeMenu() {
    this.menuController.close();
  }
}
