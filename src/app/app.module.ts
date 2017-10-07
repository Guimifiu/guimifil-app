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
import { SearchPlaceBarComponent } from '../components/search-place-bar/search-place-bar';

import { UserData } from '../providers/user-data';
import { AuthenticationService } from '../providers/authentication-service';
import { UserService } from '../providers/user-service';
import { FacebookService } from '../providers/facebook-service';
import { GoogleService } from '../providers/google-service';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Geocoder } from '@ionic-native/google-maps';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular'; 

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '287910474973285',
  },
  'push': {
    'sender_id': '1964421970',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

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
    SearchPlaceBarComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
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
    SearchPlaceBarComponent
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
