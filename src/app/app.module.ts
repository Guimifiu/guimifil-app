import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { UserProfilePage } from '../pages/user-profile/user-profile';
import { GasStationsListPage } from '../pages/gas-stations-list/gas-stations-list';
import { HomePage } from '../pages/home/home';
import { MenuTabsPage } from '../pages/menu-tabs/menu-tabs';
import { MenuSidePage } from '../pages/menu-side/menu-side';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register'
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { AtGasStationPage } from '../pages/at-gas-station/at-gas-station';
import { FuelSupplyDetailsPage } from '../pages/fuel-supply-details/fuel-supply-details';
import { FuelSupplyHistoryPage } from '../pages/fuel-supply-history/fuel-supply-history';
import { SearchPlaceBarComponent } from '../components/search-place-bar/search-place-bar';

import { UserData } from '../providers/user-data';
import { AuthenticationService } from '../providers/authentication-service';
import { UserService } from '../providers/user-service';
import { PriceSuggestionService } from '../providers/price-suggestion-service';
import { FacebookService } from '../providers/facebook-service';
import { GoogleService } from '../providers/google-service';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Geocoder } from '@ionic-native/google-maps' 


@NgModule({
  declarations: [
    MyApp,
    UserProfilePage,
    GasStationsListPage,
    HomePage,
    MenuTabsPage,
    MenuSidePage,
    LoginPage,
    RegisterPage,
    MainMenuPage,
    SearchPlaceBarComponent,
    AtGasStationPage,
    FuelSupplyHistoryPage,
    FuelSupplyDetailsPage
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
    MenuSidePage,
    LoginPage,
    RegisterPage,
    MainMenuPage,
    SearchPlaceBarComponent,
    AtGasStationPage,
    FuelSupplyHistoryPage,
    FuelSupplyDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    UserData,
    AuthenticationService,
    UserService,
    FacebookService,
    GoogleService,
    Facebook,
    GooglePlus,
    Geocoder,
    PriceSuggestionService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
