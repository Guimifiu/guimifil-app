import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController } from 'ionic-angular';
import { Form } from '../../helpers/form';
import { FormErrorMessages } from '../../validators/form-error-messages';
import { User } from '../../models/user';
import { ToastService } from '../../providers/toast-service';
import { UserData } from '../../providers/user-data';
import { UserService } from '../../providers/user-service';
import { LoadingService } from '../../providers/loading-service';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
  providers: [ToastService, LoadingService, UserService]
})
export class UserProfilePage extends Form{

  userProfileForm: FormGroup;
  user = new User();

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public toastService: ToastService,
    public loadingService: LoadingService,
    public userData: UserData,
    public userService: UserService
  ) {
    super(toastService);
    this.buildForm();
    this.setUpForm(this.userProfileForm);
  }

  buildForm() {
    var validEmail = "^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@(([^<>()[\\]\\.,;:\\s@\"]+\\.)+[^<>()[\\]\\.,;:\\s@\"]{2,})$"
    this.userProfileForm = this.formBuilder.group({
      name:[this.userData.currentUser.name, Validators.compose([
        Validators.required
      ])],
      surname:[this.userData.currentUser.surname, Validators.compose([
        Validators.required
      ])],
      email: [this.userData.currentUser.email, Validators.compose([
        Validators.pattern(validEmail),
        Validators.required,
      ])],
    });
  }

  setValidationMessages() {
    this.validationMessages = {
      'name': {
        'required': FormErrorMessages.required('Nome'),
      },
      'surname': {
        'required': FormErrorMessages.required('Sobrenome'),
      },
      'email': {
        'required': FormErrorMessages.required('Email'),
        'pattern': FormErrorMessages.invalid('Email'),
      }
    }
  }

  onSubmit() {
    if(this.userProfileForm.valid) {
      this.userData.currentUser.name = this.userProfileForm.value.name;
      this.userData.currentUser.surname = this.userProfileForm.value.surname;
      this.userData.currentUser.email = this.userProfileForm.value.email;
      this.updateUser();
    } else {
      this.markFormAsInvalid();
    }
  }

  updateUser() {
    this.loadingService.showLoading("Atualizando dados...");
    this.userService
      .update(this.userData.currentUser)
      .then(response => this.toastService.presentToast('Dados atualizados', 'success'))
      .catch(error => console.log(JSON.stringify(error)))
      .then(() => this.loadingService.dismissLoading())
  }

}
