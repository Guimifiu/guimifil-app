import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

// import { AuthenticationService } from '../../providers/authentication-service';
// import { LoginPage } from '../login/login';
import { GasStation } from '../../models/gas-station'


@Component({
  selector: 'page-change-fuel-prices',
  templateUrl: 'change-fuel-prices.html'
})
export class ChangeFuelPricesPage {

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

}
