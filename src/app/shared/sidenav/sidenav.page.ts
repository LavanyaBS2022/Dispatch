import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.page.html',
  styleUrls: ['./sidenav.page.scss'],
})
export class SidenavPage {
  name: any;
  mobile:any;

  constructor(
    private menuController: MenuController,
    private sharedService: SharedService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.name = sharedService.getName();
    this.mobile=sharedService.getNumber();
  }

  closeMenu() {
    this.menuController.close();
  }

  async openLogoutDialog() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: `Are you sure you want to logout, ${this.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    await alert.present();
  }

  logout() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem("user");
  }
}
