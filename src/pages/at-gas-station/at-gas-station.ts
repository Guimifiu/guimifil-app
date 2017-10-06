import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

// import { AuthenticationService } from '../../providers/authentication-service';
// import { LoginPage } from '../login/login';
import { GasStation } from '../../models/gas-station'


@Component({
  selector: 'at-gas-station-page',
  templateUrl: 'at-gas-station.html'
})
export class AtGasStationPage {

  gasStation = new GasStation;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
  ) {
    this.gasStation.name = this.navParams.data.gasStation;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  updatePrices() {
    alert("Teste");
  }

}
