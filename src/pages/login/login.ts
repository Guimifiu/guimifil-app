import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthenticationService } from '../../providers/authentication-service';
import { MenuSidePage } from '../menu-side/menu-side';
import { MenuTabsPage } from '../menu-tabs/menu-tabs';
import { User } from '../../models/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authenticationService: AuthenticationService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  facebookLogin() {
    this.authenticationService
      .facebookLogin()
      .then(() => {
        this.goToUserRootMenuPage();
      })
      .catch(error => {
        console.log(JSON.stringify(error));
         if (error instanceof User) {
          //register user
          //authenticationService.register(error)
        }
      });
  }

  googleLogin() { 
    // TODO
    // install cordova google plugin
    // create settings on google
    // put google varibales on config/environment-... file
    // call authentication-service with google login method
    console.log('login with google');
  }

  nativeLogin() {
    this.showLoading()
    this.authenticationService.nativeLogin(this.registerCredentials).then(allowed => {
      if (allowed) {
        setTimeout(() => {
        this.loading.dismiss();
        this.navCtrl.setRoot(MenuTabsPage)
        });
      } else {
        this.showError("Acesso Negado.");
      }
    },
    error => {
      this.showError(error);
    });
  }

  register() {
    // call authentication-service with register method
    console.log('register');
  }

    showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
  }
 
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Falhou',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  goToUserRootMenuPage() {
    this.navCtrl.setRoot(MenuSidePage);
  }

}
