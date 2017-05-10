import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { UserProfilePage } from '../user-profile/user-profile';
import { GasStationsListPage } from '../gas-stations-list/gas-stations-list';
import { MenuSidePage } from '../menu-side/menu-side';
import { MainMenuPage } from '../main-menu/main-menu';

@Component({
  templateUrl: 'menu-tabs.html'
})
export class MenuTabsPage {

  homePage: any = HomePage;
  userProfilePage: any = UserProfilePage;
  gasStationsListPage: any = GasStationsListPage;
  menuSidePage: any = MenuSidePage;
  mainMenuPage: any = MainMenuPage;

  constructor(
  ) 
  {}

}
