import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { LoadingService } from '../../providers/loading-service';
import { FuelSupply } from '../../models/fuel-supply'
import { FuelSupplyService } from '../../providers/fuel-supply-service';
import { UserData } from '../../providers/user-data';
import { ToastService } from '../../providers/toast-service';
import { FuelSupplyDetailsPage } from '../fuel-supply-details/fuel-supply-details';


@Component({
  selector: 'fuel-supply-history-page',
  templateUrl: 'fuel-supply-history.html',
  providers: [ 
    FuelSupplyService,
    LoadingService,
    ToastService
   ]
})
export class FuelSupplyHistoryPage {

  fuelSupplies = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingService: LoadingService,
    public fuelSupplyService: FuelSupplyService,
    public userData: UserData,
    public toastService: ToastService,
    public modalCtrl: ModalController,
  ) {
    this.getFuelSupplies();
  }

  getFuelSupplies() {
    this.loadingService.showLoading('Carregando...');
    this.fuelSupplyService.getAll(this.userData.currentUser)
      .then((fuelSupplies) => this.fuelSupplies = fuelSupplies)
      .catch((error) => this.toastService.presentToast(error))
      .then(() => this.loadingService.dismissLoading());
  }

  parseFuelSupplyValue(value) {
    return parseFloat(value).toFixed(2);
  }

  getTotalSpent() {
    var totalSpent = 0.0;
    this.fuelSupplies.forEach(element => {
      if(element.value) {
        totalSpent += parseFloat(element.value);
      }
    });
    return totalSpent.toFixed(2);
  }

  presentFuelSupplyDetails(fuelSupply: FuelSupply) {
    let modal = this.modalCtrl.create(FuelSupplyDetailsPage, { "fuelSupply":  fuelSupply });
    modal.onDidDismiss(data => {
      // console.log(data);
    });
    modal.present();
  }


}
