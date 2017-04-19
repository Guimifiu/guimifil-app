import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { IonicModule } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';

import { UserService } from '../../../providers/user-service';
import { UserData } from '../../../providers/user-data';
import { FacebookService } from '../../../providers/facebook-service';
import { GoogleService } from '../../../providers/google-service';
import { AuthenticationService } from '../../../providers/authentication-service';
import { LoginPage } from '../../../pages/login/login';

describe('Unit test: Pages: Login', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(LoginPage)
      ],
      providers: [
        NavController,
        AuthenticationService,
        UserService,
        FacebookService,
        GoogleService,
        Facebook,
        GooglePlus,
        UserData,
        NativeStorage
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  });


  it ('should be created', () => {
    expect(component instanceof LoginPage).toBeTruthy();
  });
});
