import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GasStation } from '../../models/gas-station'
import { FuelSupply } from '../../models/fuel-supply'
import { Rating } from '../../models/rating'
import { UserData } from '../../providers/user-data';
import { Form } from '../../helpers/form';
import { FormErrorMessages } from '../../validators/form-error-messages';
import { ToastService } from '../../providers/toast-service';

@Component({
  selector: 'fuel-supply-creation-page',
  templateUrl: 'fuel-supply-creation.html',
  providers: [
    ToastService
   ]
})
export class FuelSupplyCreationPage extends Form{

  gasStation = new GasStation;
  fuelSupplyForm: FormGroup;
  fuelTypes = [
    {description: 'gas', translation: 'Gasolina'},
    {description: 'alcohol', translation: 'Álcool'},
    {description: 'diesel', translation: 'Diesel'}
  ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public userData: UserData,
    public toastService: ToastService,
    public formBuilder: FormBuilder,
  ) {
    super(toastService);
    this.gasStation = this.navParams.data.gasStation;
    this.buildForm();
    this.setUpForm(this.fuelSupplyForm);
  }

  buildForm() {
    var validRating = "^[1-9]\\d*$"
    
    this.fuelSupplyForm = this.formBuilder.group({
      fuel_supply_value: [null, Validators.compose([
        Validators.required,
      ])],
      fuel_type: [this.fuelTypes[0].description, Validators.compose([
        Validators.required,
      ])],
      gas_station_rate: [0, Validators.compose([
        Validators.required,
        Validators.pattern(validRating),
      ])],
    });
  }

  setValidationMessages() {
    this.validationMessages = {
      'fuel_supply_value': {
        'required': FormErrorMessages.required('Valor'),
      },
      'fuel_type': {
        'required': FormErrorMessages.required('Tipo'),
      },
      'gas_station_rate': {
        'required': FormErrorMessages.required('Avaliação'),
        'pattern': FormErrorMessages.required('Avaliação'),
      }
    }
  }

  onSubmit() {
    if (this.fuelSupplyForm.valid) {
      this.dismiss(this.fuelSupplyForm.value);
    } else {
      this.markFormAsInvalid();
    }
  }

  dismiss(formData?) {
    var data = {
      formData: formData
    }
    this.viewCtrl.dismiss(data);
  }

}
