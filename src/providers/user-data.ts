import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';

import { User } from '../models/user';

@Injectable()
export class UserData {

  private HAS_LOGGED_IN = 'userHasLoggedIn';
  private USER = 'userKey';
  currentUser: User;

  constructor(
    private events: Events,
    private nativeStorage: NativeStorage,
  ) {
    console.log('Hello UserData Provider');
  }

  login(user) {
    this.currentUser = user;
    this.nativeStorage.setItem(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login');
    return this.nativeStorage.setItem(this.USER, user);
  }

  logout() {
    this.nativeStorage.remove(this.HAS_LOGGED_IN);
    this.nativeStorage.remove(this.USER);
    this.events.publish('user:logout');
  }

}
