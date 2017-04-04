import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, NavParams, Nav } from 'ionic-angular';

import { HomePage } from '../home/home';
import { UserProfilePage } from '../user-profile/user-profile';
import { GasStationsListPage } from '../gas-stations-list/gas-stations-list';

export interface PageInterface {
  title: string;
  component: any;
}

@Component({
  selector: 'page-menu-side',
  templateUrl: 'menu-side.html'
})
export class MenuSidePage {

  @ViewChild(Nav) nav: Nav;

  appPages: PageInterface[] = [
    { title: 'Home', component: HomePage},
    { title: ' Meu Perfil', component: UserProfilePage},
    { title: 'Postos de Gasolina', component: GasStationsListPage}
  ];

  rootPage = HomePage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuSidePage');
  }


  openPage(page) {
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

}
