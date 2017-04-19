import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuSidePage } from '../pages/menu-side/menu-side';
import { LoginPage } from '../pages/login/login';
import { UserData } from '../providers/user-data';


@Component({
  template: `<ion-nav #nav [root]="rootPage"></ion-nav>`
})
export class MyApp {

  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private userData: UserData,
  ) {
    platform
      .ready()
      .then(() => {
        
        this.userData.getCurrentUser()
        .then(user => {
          this.userData.login(user);
          this.rootPage = MenuSidePage;
        })
        .catch(error => {
          this.rootPage = LoginPage;
        })

        statusBar.styleDefault();
        splashScreen.hide();
    });
  }
}

