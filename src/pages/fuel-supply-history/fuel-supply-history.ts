import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

// import { AuthenticationService } from '../../providers/authentication-service';
// import { LoginPage } from '../login/login';
import { FuelSupply } from '../../models/fuel-supply'


@Component({
  selector: 'fuel-supply-history-page',
  templateUrl: 'fuel-supply-history.html'
})
export class FuelSupplyHistoryPage {

  fuelSupplies = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
  }


}
