import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';
import { UserService } from '../providers/user-service';
import { ToastService } from '../providers/toast-service';

import { User } from '../models/user';

@Injectable()
export class UserData {

  private USER = 'userKey';
  currentUser: User;

  constructor(
    private events: Events,
    private nativeStorage: NativeStorage,
    private push: Push,
    private userService: UserService,
    private toastService: ToastService,
  ) {
    console.log('Hello UserData Provider');
  }

  login(user) {
    this.currentUser = user;
    this.events.publish('user:login');
    this.registerToPushNotification();
    return this.nativeStorage.setItem(this.USER, user);
  }

  logout() {
    this.nativeStorage.remove(this.USER);
    this.events.publish('user:logout');
  }

  registerToPushNotification() {
    this.push.options.debug = true;
    return this.push.register()
      .then((token: PushToken) => {
        return this.push.saveToken(token);
      })
      .then(pushToken => {
        this.currentUser.device_token = pushToken.token;
        return this.userService.update(this.currentUser);
      })
      .catch(error => {
        this.toastService.presentToast(`Erro ao atualizar token do telefone.
        Por favor saia do aplicativo e entre novamente.`);
        return error;
      })
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
