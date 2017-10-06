import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, AlertController} from 'ionic-angular';

import { GasStation } from '../../models/gas-station'
import { PriceSuggestion } from '../../models/price-suggestion'
import { PriceSuggestionService } from '../../providers/price-suggestion-service'
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'at-gas-station-page',
  templateUrl: 'at-gas-station.html',
  providers: [PriceSuggestionService]
})
export class AtGasStationPage {

  gasStation = new GasStation;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public userData: UserData,
    public priceSuggestionService: PriceSuggestionService,
    public alertCtrl: AlertController,
  ) {
    this.gasStation = this.navParams.data.gasStation;
  }

  dismiss(answer: boolean, value?: string) {
    var data = {
      fuelled: answer,
      value: parseFloat(value)
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

  presentSupplyValueAlert() {
    const alert = this.alertCtrl.create({
      title: 'Quanto está abastecendo?',
      inputs: [
        {
          name: 'value',
          placeholder: "0.00",
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
            this.dismiss(true, data.value)
          }
        }
      ]
    });
    alert.present();
}

  createPriceSuggestion(typeAttribute: string, value: string) {
    console.log(value)
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

}
