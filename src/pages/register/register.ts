import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Form } from '../../helpers/form';
import { FormErrorMessages } from '../../validators/form-error-messages';
import { AuthenticationService } from '../../providers/authentication-service';
import { User } from '../../models/user';
import { MenuSidePage } from '../menu-side/menu-side';
import { ToastService } from '../../providers/toast-service';
import { LoadingService } from '../../providers/loading-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [ToastService, LoadingService]
})
export class RegisterPage extends Form{

  createSuccess = false;
  user = new User();
  registerForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private authenticationService: AuthenticationService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public toastService: ToastService,
    public loadingService: LoadingService,
  ) {
    super(toastService);
    this.buildForm();
    this.setUpForm(this.registerForm);
  }


  buildForm() {
    var validEmail = "^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@(([^<>()[\\]\\.,;:\\s@\"]+\\.)+[^<>()[\\]\\.,;:\\s@\"]{2,})$"
    this.registerForm = this.formBuilder.group({
      name:['', Validators.compose([
        Validators.required
      ])],
      surname:['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.pattern(validEmail),
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      password_confirmation: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
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
      },
      'password': {
        'required': FormErrorMessages.required('Senha'),
        'minLength': FormErrorMessages.minlength('Senha', '6'),
      },
      'password_confirmation': {
        'required': FormErrorMessages.required('Confirmação de Senha'),
        'minLength': FormErrorMessages.minlength('Confirmação de Senha', '6'),
      }
    }
  }

  onSubmit() {
    if(this.registerForm.valid) {
      this.user.name = this.registerForm.value.name;
      this.user.surname = this.registerForm.value.surname;
      this.user.email = this.registerForm.value.email;
      this.user.password = this.registerForm.value.password;
      this.user.password_confirmation = this.registerForm.value.password_confirmation;
      this.register();
    } else {
      this.markFormAsInvalid();
    }
  }

  public register() {
    if(this.user.password == this.user.password_confirmation){
      let newUser = new User;
      newUser.name = this.user.name;
      newUser.surname = this.user.surname;
      newUser.email = this.user.email;
      newUser.password = this.user.password;
      newUser.provider = 'email';
      this.authenticationService
        .register(newUser)
        .then(success => {
          if (success) {
            this.createSuccess = true;
            this.showPopup("Sucesso", "Conta criada.");
          } else {
            this.showPopup("Erro", "Problema ao criar conta.");
          }
        }, error => this.showPopup("Erro", error));
    }
    else{
      this.showPopup("Erro", "As senhas inseridas não são iguas" );
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
             this.navCtrl.setRoot(MenuSidePage);
           }
         }
       }
     ]
    });
    alert.present();
  }
}
