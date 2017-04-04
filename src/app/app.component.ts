import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuSidePage } from '../pages/menu-side/menu-side';
import { HomePage } from '../pages/home/home';
import { GasStationsListPage } from '../pages/gas-stations-list/gas-stations-list';
import { UserProfilePage } from '../pages/user-profile/user-profile';


@Component({
  template: `<ion-nav #nav [root]="rootPage"></ion-nav>`
})
export class MyApp {

  rootPage: any;
  
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    platform
      .ready()
      .then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
        this.rootPage = MenuSidePage;
    });
  }
}
