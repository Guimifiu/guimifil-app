import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, AlertController} from 'ionic-angular';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

import { GasStation } from '../../models/gas-station'
import { FuelSupply } from '../../models/fuel-supply'
import { Rating } from '../../models/rating'
import { PriceSuggestion } from '../../models/price-suggestion'
import { PriceSuggestionService } from '../../providers/price-suggestion-service'
import { UserData } from '../../providers/user-data';
import { FuelSupplyCreationPage } from '../fuel-supply-creation/fuel-supply-creation';
import { MapService } from '../../providers/map-service';
import { LoadingService } from '../../providers/loading-service';
import { LatLng } from '@ionic-native/google-maps';

@Component({
  selector: 'gas-station-details-page',
  templateUrl: 'gas-station-details.html',
  providers: [
    PriceSuggestionService,
    MapService,
    LaunchNavigator,
    LoadingService
  ]
})
export class GasStationDetailsPage {

  gasStation = new GasStation;
  stars = [];
  emptyStars = [];
  currentPosition: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public userData: UserData,
    private mapService: MapService,
    private launchNavigator: LaunchNavigator,
    private loadingService: LoadingService,
    public alertCtrl: AlertController,
  ) {
    this.gasStation = this.navParams.data.gasStation;
    this.currentPosition = this.navParams.data.currentPosition;
    this.getGasStationStars();
  }

  ngOnInit() {
    this.loadingService.showLoading('Buscando dados do Posto...')
    this.mapService.
      getDirection(
        this.currentPosition.latLng.lat,
        this.currentPosition.latLng.lng,
        this.gasStation.latitude,
        this.gasStation.longitude
      ).then(gasStationInfo => {
        this.gasStation.navigation_duration = gasStationInfo['duration'];
        this.gasStation.navigation_distance = gasStationInfo['distance'];
      }).catch(error => console.log(JSON.stringify(error)))
    .then(() => this.loadingService.dismissLoading())
  }

  getGasStationStars() {
    if(this.gasStation.reputation === null) {
      this.emptyStars.length = 5;
    } else {
      let reputation = Math.floor(this.gasStation.reputation);
      for (var _i = 0; _i < reputation; _i++) {
        this.stars[_i] = _i
      }
      for (var _n = 0; _n < (5 - reputation); _n++) {
        this.emptyStars[_n] = _n;
      }
    }
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  openNavigationApps() {
    let options: LaunchNavigatorOptions = {
      start: ''
    };
    let destination = `${this.gasStation.latitude},${this.gasStation.longitude}`
    this.launchNavigator.navigate(destination, options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }
  
  parseFloatValue(value) {
    return parseFloat(value).toFixed(2);
  }

  presentBoycottedInfoAlert() {
    let alert = this.alertCtrl.create({
      title: 'Posto boicotado',
      subTitle: 'Este posto está sendo boicotado, opte por abastecer em outro',
      buttons: ['OK']
    });
    alert.present();
  }

}
