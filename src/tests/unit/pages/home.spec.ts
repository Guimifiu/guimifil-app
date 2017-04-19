import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { IonicModule } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { UserData } from '../../../providers/user-data';
import { HomePage } from '../../../pages/home/home';
import { User } from '../../../models/user';

describe('Unit test: Pages: Home', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let de: DebugElement;
  let el: HTMLElement;
  let userData: UserData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage)
      ],
      providers: [
        NavController,
        UserData,
        NativeStorage
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    let user = new User();
    user.name = 'App';
    user.surname = 'Test';
    user.email = 'apptest@apptest.com'
    userData = fixture.debugElement.injector.get(UserData);
    userData.login(user);
  });


  it ('should be created', () => {
    expect(component instanceof HomePage).toBeTruthy();
  });

  it("should displays user's information: name, surname", () => {
    let currentUser = userData.currentUser;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('ion-content'));
    el = de.nativeElement; 

    expect(el.textContent).toContain(currentUser.name);
    expect(el.textContent).toContain(currentUser.surname);
  });

});