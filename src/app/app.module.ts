import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { GasStationsListPage } from '../pages/gas-stations-list/gas-stations-list';
import { HomePage } from '../pages/home/home';
import { MenuTabsPage } from '../pages/menu-tabs/menu-tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    UserProfilePage,
    GasStationsListPage,
    HomePage,
    MenuTabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserProfilePage,
    GasStationsListPage,
    HomePage,
    MenuTabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
