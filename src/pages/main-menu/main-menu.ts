import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AuthenticationService } from '../../providers/authentication-service';
import { GasStation } from '../../models/gas-station'; //TODO delete it (just for testing)
import { AtGasStationPage } from '../at-gas-station/at-gas-station';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
  providers: [ AuthenticationService ]
})
export class MainMenuPage {
 
  //TODO delete gas station and areYouAtGasStation method (they are here for testing)
  gasStation = new GasStation;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authenticationService: AuthenticationService,
    public modalCtrl: ModalController
  ) {
    this.gasStation.id = 41;
    this.gasStation.latitude = "-16.01664";
    this.gasStation.longitude = "-48.062984";
    this.gasStation.google_maps_id = "ChIJg4Kc9wyAWZMRC30jT567Fp0";
    this.gasStation.vicinity = "Q 55 Lote 08 Setor Central, Braslia";
    this.gasStation.name = "Gas & Oil Comercio De Combustiveis Ltda";
    this.gasStation.gas_price = 1.0;
    this.gasStation.diesel_price = 1.0;
    this.gasStation.alcohol_price = 1.0;
  }

  logout() {
    this.authenticationService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  areYouAtGasStation() {
    let modal = this.modalCtrl.create(AtGasStationPage, { "gasStation": this.gasStation });
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

}
