import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dispatch', url: '/folder/Dispatch', icon: 'mail' },
    { title: 'Dispatch details', url: '/folder/Dispatch Details', icon: 'paper-plane' },
  ];
   // Inject the MenuController in the constructor
   constructor(private menuController: MenuController) {}

   // Method to close the side menu
   closeMenu() {
     this.menuController.close();
   }
}
