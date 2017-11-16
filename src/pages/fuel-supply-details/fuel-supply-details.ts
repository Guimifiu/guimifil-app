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
  stars = [];
  emptyStars = [];

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
    this.getFuelSupplyRating();
  }

  getFuelSupplyRating() {
    if(this.fuelSupply.rating_stars === null) {
      this.emptyStars.length = 5;
    } else {
      let reputation = Math.floor(this.fuelSupply.rating_stars);
      for (var _i = 0; _i < reputation; _i++) {
        this.stars[_i] = _i
      }
      for (var _n = 0; _n < (5 - reputation); _n++) {
        this.emptyStars[_n] = _n;
      }
    }
  }

  dismiss() {
    var data = {}
    this.viewCtrl.dismiss(data);
  }

  parseFuelSupplyValue(value) {
    return parseFloat(value).toFixed(2);
  }


}
