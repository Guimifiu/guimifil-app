import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuTabsPage } from '../pages/menu-tabs/menu-tabs';
import { LoginPage } from '../pages/login/login';
import { UserData } from '../providers/user-data';
import { User } from '../models/user';

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
          this.rootPage = MenuTabsPage;
        })
        .catch(() => {
          this.rootPage = LoginPage;
        })

        statusBar.styleDefault();
        splashScreen.hide();
    });
  }
}

