import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  facebookLogin() {
    // TODO
    // install cordova facebook plugin
    // create app on facebook
    // put facebook varibales on config/environment-... file
    // call authentication-service with facebook login method
    console.log('login with facebook');
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
    // TODO
    // make form to get user email and password
    // call authentication-service with native-login method
    console.log('register');
  }

  register() {
    // call authentication-service with register method
    console.log('register');
  }

}
