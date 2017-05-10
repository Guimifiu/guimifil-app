import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthenticationService } from '../../providers/authentication-service';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
  providers: [ AuthenticationService ]
})
export class MainMenuPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authenticationService: AuthenticationService
  ) {}

  logout() {
    this.authenticationService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
