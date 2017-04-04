import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { GasStationsListPage } from '../pages/gas-stations-list/gas-stations-list';
import { HomePage } from '../pages/home/home';
import { MenuTabsPage } from '../pages/menu-tabs/menu-tabs';
import { MenuSidePage } from '../pages/menu-side/menu-side';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    UserProfilePage,
    GasStationsListPage,
    HomePage,
    MenuTabsPage,
    MenuSidePage
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
    MenuTabsPage,
    MenuSidePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
