import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, AlertController} from 'ionic-angular';

import { GasStation } from '../../models/gas-station'
import { FuelSupply } from '../../models/fuel-supply'
import { PriceSuggestion } from '../../models/price-suggestion'
import { PriceSuggestionService } from '../../providers/price-suggestion-service'
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'fuel-supply-details-page',
  templateUrl: 'fuel-supply-details.html',
  providers: [PriceSuggestionService]
})
export class FuelSupplyDetailsPage {

  gasStation = new GasStation;
  fuelSupply = new FuelSupply;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public userData: UserData,
    public priceSuggestionService: PriceSuggestionService,
    public alertCtrl: AlertController,
  ) {
    this.fuelSupply = this.navParams.data.fuelSupply;
  }

  dismiss() {
    var data = {}
    this.viewCtrl.dismiss(data);
  }

  parseFuelSupplyValue(value) {
    return parseFloat(value).toFixed(2);
  }

}
