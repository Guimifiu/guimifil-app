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

@Component({
  selector: 'gas-station-details-page',
  templateUrl: 'gas-station-details.html',
  providers: [
    PriceSuggestionService,
    MapService,
    LaunchNavigator
  ]
})
export class GasStationDetailsPage {

  gasStation = new GasStation;
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
    private mapService: MapService,
    private launchNavigator: LaunchNavigator
  ) {
    this.gasStation = this.navParams.data.gasStation;
    this.getGasStationStars();
  }

  ngOnInit() {
    this.mapService
    .getCurrentPosition()
    .then(currentPosition => {
      this.mapService.
        getDirection(
          currentPosition.latLng.lat,
          currentPosition.latLng.lng,
          this.gasStation.latitude,
          this.gasStation.longitude
        ).then(gasStationInfo => {
          this.gasStation.navigation_duration = gasStationInfo['duration'];
          this.gasStation.navigation_distance = gasStationInfo['distance'];
        })
      }).catch(error => console.log(JSON.stringify(error)))
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
  
  dismiss(answer: boolean, formData?) {
    var data = {
      fuelled: answer,
      formData: formData
    }
    this.viewCtrl.dismiss(data);
  }

  presentEditPriceAlert(typeAttribute: string) {
      const alert = this.alertCtrl.create({
        title: 'Editar preço',
        inputs: [
          {
            name: 'value',
            placeholder: "" + this.gasStation[typeAttribute].toFixed(2),
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Salvar',
            handler: data => {
              this.createPriceSuggestion(typeAttribute, data.value)
            }
          }
        ]
      });
      alert.present();
  }

  presentFuelSupplyCreationPage() {
    let modal = this.modalCtrl.create(FuelSupplyCreationPage, { "gasStation": this.gasStation });
    modal.onDidDismiss(data => {
      if(data.formData) {
        this.dismiss(true, data.formData);
      }
    });
    modal.present();
  }

  openNavigationApps() {
    let options: LaunchNavigatorOptions = {
      start: ''
    };
    let destination = [this.gasStation.latitude, this.gasStation.longitude]
    this.launchNavigator.navigate(destination, options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }
  

  // presentSupplyValueAlert() {
  //   const alert = this.alertCtrl.create({
  //     title: 'Quanto está abastecendo?',
  //     inputs: [
  //       {
  //         name: 'value',
  //         placeholder: "0.00",
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Salvar',
  //         handler: data => {
  //           this.dismiss(true, data.value)
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  createPriceSuggestion(typeAttribute: string, value: string) {
    if(value != '') {
      this.gasStation[typeAttribute] = parseFloat(value);
      var priceSuggestion = new PriceSuggestion;
      if(typeAttribute === 'gas_price') {
        priceSuggestion.fuel_type = 'gas'
      } else if(typeAttribute === 'alcohol_price') {
        priceSuggestion.fuel_type = 'alcohol'
      } else if(typeAttribute === 'diesel_price') {
        priceSuggestion.fuel_type = 'diesel'
      }
      priceSuggestion.gas_station_id = this.gasStation.id;
      priceSuggestion.value = parseFloat(value);
      this.priceSuggestionService.create(this.userData.currentUser, priceSuggestion)
      .then(priceSuggestion => {

      })
      .catch(error => { console.log(JSON.stringify(error))})
    }
  }

  parseFloatValue(value) {
    return parseFloat(value).toFixed(2);
  }

}
