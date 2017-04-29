import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AuthenticationService } from '../../providers/authentication-service';
import { User } from '../../models/user';
import { MenuSidePage } from '../menu-side/menu-side';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  createSuccess = false;
  user = new User();

  constructor(
    private navCtrl: NavController,
    private authenticationService: AuthenticationService,
    private alertCtrl: AlertController
  ) {}

  public register() {
    if(this.user.password == this.user.password_confirmation){
      this.user.provider = 'email';
      this.authenticationService
        .register(this.user)
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
