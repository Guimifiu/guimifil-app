import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';

import { User } from '../models/user';

@Injectable()
export class UserData {

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
    this.events.publish('user:login');
    return this.nativeStorage.setItem(this.USER, user);
  }

  logout() {
    this.nativeStorage.remove(this.USER);
    this.events.publish('user:logout');
  }

  getCurrentUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem(this.USER)
        .then(user => {
          resolve(user as User)
        })
        .catch(error => reject(error));
    });
  }

}
