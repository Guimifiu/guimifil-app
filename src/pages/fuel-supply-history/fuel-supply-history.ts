import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadingService } from '../../providers/loading-service';
import { FuelSupply } from '../../models/fuel-supply'
import { FuelSupplyService } from '../../providers/fuel-supply-service';
import { UserData } from '../../providers/user-data';
import { ToastService } from '../../providers/toast-service';
import { FuelSupplyDetailsPage } from '../fuel-supply-details/fuel-supply-details';
import { Form } from '../../helpers/form';
import { FormErrorMessages } from '../../validators/form-error-messages';


@Component({
  selector: 'fuel-supply-history-page',
  templateUrl: 'fuel-supply-history.html',
  providers: [ 
    FuelSupplyService,
    LoadingService,
    ToastService
   ]
})
export class FuelSupplyHistoryPage extends Form{

  fuelSupplies = [];
  historyMonths = [];
  monthForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingService: LoadingService,
    public fuelSupplyService: FuelSupplyService,
    public userData: UserData,
    public toastService: ToastService,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    
  ) {
    super(toastService);
    this.getFuelSupplies();
    this.buildForm();
    this.setUpForm(this.monthForm);
  }

  buildForm() {
    this.monthForm = this.formBuilder.group({
      historyMonth: [this.historyMonths[0], Validators.compose([
        Validators.required,
      ])],
    });
  }

  setValidationMessages() {
    this.validationMessages = {
      'historyMonth': {
        'required': FormErrorMessages.required('Mês'),
      }
    }
  }

  getFuelSupplies() {
    this.loadingService.showLoading('Carregando...');
      this.fuelSupplyService.historyMonths(this.userData.currentUser)
      .then(historyMonths => {
        this.historyMonths = historyMonths;
        this.historyMonths.push('Todos');
        this.fuelSupplyService.getAll(this.userData.currentUser, historyMonths[0])
        .then((fuelSupplies) => {
          this.fuelSupplies = fuelSupplies
        })
      })
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

  onSubmit() {
    if (this.monthForm.valid) {
      this.loadingService.showLoading('Carregando...');
      var historyMonth = this.monthForm.value.historyMonth;
      if(historyMonth === 'Todos') {
        this.fuelSupplyService.getAll(this.userData.currentUser, '')
        .then((fuelSupplies) => {
          this.fuelSupplies = fuelSupplies
        })
        .catch((error) => this.toastService.presentToast(error))
        .then(() => this.loadingService.dismissLoading());
      } else {
        this.fuelSupplyService.getAll(this.userData.currentUser, historyMonth)
        .then((fuelSupplies) => {
          this.fuelSupplies = fuelSupplies
        })
        .catch((error) => this.toastService.presentToast(error))
        .then(() => this.loadingService.dismissLoading());
      }
    } else {
      this.markFormAsInvalid();
    }
  }


}
