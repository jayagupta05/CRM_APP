import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ChangePasswordPage } from 'src/app/common/change-password/change-password.page';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  constructor(
    public modalController: ModalController,
    public menu: MenuController
  ) { }

  ngOnInit() {
  }

  openCustom() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

  public async openChangePwd(){
    const model = await this.modalController.create({
      component: ChangePasswordPage,
    });
    await model.present();
  }
}
