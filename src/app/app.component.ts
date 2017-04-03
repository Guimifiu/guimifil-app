import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuTabsPage } from '../pages/menu-tabs/menu-tabs';
import { HomePage } from '../pages/home/home';
import { GasStationsListPage } from '../pages/gas-stations-list/gas-stations-list';
import { UserProfilePage } from '../pages/user-profile/user-profile';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MenuTabsPage;
  @ViewChild(Nav) nav: Nav;
  
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Postos de Gasolina', component: GasStationsListPage },
      { title: 'Meu Perfil', component: UserProfilePage}
    ];
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
