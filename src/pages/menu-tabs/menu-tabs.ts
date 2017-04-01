import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { UserProfilePage } from '../user-profile/user-profile';
import { GasStationsListPage } from '../gas-stations-list/gas-stations-list';

@Component({
  templateUrl: 'menu-tabs.html'
})
export class MenuTabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  homePage: any = HomePage;
  userProfilePage: any = UserProfilePage;
  gasStationsListPage: any = GasStationsListPage;

  constructor() {

  }
}
