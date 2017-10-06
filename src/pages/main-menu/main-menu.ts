import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AuthenticationService } from '../../providers/authentication-service';
import { AtGasStationPage } from '../at-gas-station/at-gas-station';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
  providers: [ AuthenticationService ]
})
export class MainMenuPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authenticationService: AuthenticationService,
    public modalCtrl: ModalController
  ) {}

  logout() {
    this.authenticationService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  areYouAtGasStation() {
    let modal = this.modalCtrl.create(AtGasStationPage, { "gasStation": 'Posto Shell Setor Central' });
    modal.present();
  }

}
