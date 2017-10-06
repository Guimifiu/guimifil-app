import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AuthenticationService } from '../../providers/authentication-service';
import { FuelSupplyService } from '../../providers/fuel-supply-service'; //TODO delete it (just for testing)
import { GasStation } from '../../models/gas-station'; //TODO delete it (just for testing)
import { FuelSupply } from '../../models/fuel-supply'; //TODO delete it (just for testing)
import { AtGasStationPage } from '../at-gas-station/at-gas-station';
import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data'; //TODO delete it (just for testing)


@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
  providers: [
    AuthenticationService, 
    FuelSupplyService //TODO delete it (just for testing)
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
      fuelSupply.value = data.value;
      fuelSupply.user_id = this.userData.currentUser.id;
      this.fuelSupplyService.create(fuelSupply)
      .then(fuelSupply => {

      })
      .catch(error => console.log(JSON.stringify(error)))
    });
    modal.present();
  }

}
