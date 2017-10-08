import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AuthenticationService } from '../../providers/authentication-service';
import { FuelSupplyService } from '../../providers/fuel-supply-service'; //TODO delete it (just for testing)
import { RatingService } from '../../providers/rating-service'; //TODO delete it (just for testing)
import { GasStation } from '../../models/gas-station'; //TODO delete it (just for testing)
import { FuelSupply } from '../../models/fuel-supply'; //TODO delete it (just for testing)
import { Rating } from '../../models/rating'; //TODO delete it (just for testing)
import { AtGasStationPage } from '../at-gas-station/at-gas-station';
import { LoginPage } from '../login/login';
import { FuelSupplyHistoryPage } from '../fuel-supply-history/fuel-supply-history';
import { UserData } from '../../providers/user-data'; //TODO delete it (just for testing)


@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
  providers: [
    AuthenticationService, 
    FuelSupplyService, //TODO delete it (just for testing)
    RatingService //TODO delete it (just for testing)
  ]
})
export class MainMenuPage {
 
  //TODO delete gas station and areYouAtGasStation method (they are here for testing)
  gasStation = new GasStation;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authenticationService: AuthenticationService,
    public modalCtrl: ModalController, //TODO delete it (just for testing)
    public userData: UserData, //TODO delete it (just for testing)
    public fuelSupplyService: FuelSupplyService, //TODO delete it (just for testing)
    public ratingService: RatingService, //TODO delete it (just for testing)
  ) {
    this.gasStation.id = 41; //TODO delete it (just for testing)
    this.gasStation.latitude = "-16.01664"; //TODO delete it (just for testing)
    this.gasStation.longitude = "-48.062984"; //TODO delete it (just for testing)
    this.gasStation.google_maps_id = "ChIJg4Kc9wyAWZMRC30jT567Fp0"; //TODO delete it (just for testing)
    this.gasStation.vicinity = "Q 55 Lote 08 Setor Central, Braslia"; //TODO delete it (just for testing)
    this.gasStation.name = "Gas & Oil Comercio De Combustiveis Ltda"; //TODO delete it (just for testing)
    this.gasStation.gas_price = 1.0; //TODO delete it (just for testing)
    this.gasStation.diesel_price = 1.0; //TODO delete it (just for testing)
    this.gasStation.alcohol_price = 1.0; //TODO delete it (just for testing)
    this.gasStation.reputation = 4.10; //TODO delete it (just for testing)
  }

  logout() {
    this.authenticationService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  areYouAtGasStation() {
    let modal = this.modalCtrl.create(AtGasStationPage, { "gasStation": this.gasStation });
    modal.onDidDismiss(data => {
      var fuelSupply = new FuelSupply();
      fuelSupply.boycotted = false; //TODO get if gas station is boycotted
      fuelSupply.fuelled = data.fuelled;
      fuelSupply.gas_station_id = this.gasStation.id;
      if(data.formData) {
        fuelSupply.value = data.formData.fuel_supply_value;
        fuelSupply.fuel_type = data.formData.fuel_type;
      }
      this.fuelSupplyService.create(this.userData.currentUser, fuelSupply)
      .then(fuelSupply => {
        if(data.formData) {
          var rating = new Rating();
          rating.stars = data.formData.gas_station_rate;
          rating.gas_station_id = this.gasStation.id;
          rating.fuel_supply_id = fuelSupply.id;
          this.ratingService.create(this.userData.currentUser, rating)
          .then(rating => console.log(JSON.stringify(rating)))
        }
      })
      .catch(error => console.log(JSON.stringify(error)))
    });
    modal.present();
  }

  goToFuelSupplyHistory() {
    this.navCtrl.push(FuelSupplyHistoryPage);
  }

}
