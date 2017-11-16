import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppMinimize } from '@ionic-native/app-minimize';

import { MenuTabsPage } from '../pages/menu-tabs/menu-tabs';
import { LoginPage } from '../pages/login/login';
import { UserData } from '../providers/user-data';
import { User } from '../models/user';
import {
  Push,
  PushToken,
} from '@ionic/cloud-angular';

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
    public push: Push,
    private appMinimize: AppMinimize
  ) {
    platform
      .ready()
      .then(() => {
        this.platform.registerBackButtonAction(() => {
          this.appMinimize.minimize();
       });
        this.userData.getCurrentUser()
        .then(user => {
          this.userData.login(user);
          this.rootPage = MenuTabsPage;
          this.userData.registerToPushNotification();
        })
        .catch(() => {
          this.rootPage = LoginPage;
        })
    });
  }
}

