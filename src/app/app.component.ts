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
        //First - check if user is logged
        if(this.userData.currentUser) { 
          this.rootPage = MenuSidePage;
        } else {
          this.rootPage = LoginPage;
        }
        statusBar.styleDefault();
        splashScreen.hide();
        
    });
  }
}
