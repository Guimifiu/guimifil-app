import { Injectable } from '@angular/core';
import { GooglePlus } from 'ionic-native';

import { ENV } from '../config/environment-development';
import { User } from '../models/user';

@Injectable()
export class GoogleService {

  private permissions = {
    'scopes': 'email profile',
    'webClientId': ENV.GOOGLE_APP_WEB_ID,
    'offline': false
  }

  constructor() {
  }

  login(): Promise<User> {
    return new Promise((resolve, reject) => {
      let user = new User;
      GooglePlus
      .login(this.permissions)
      .then(userData => {
        user.id = userData.userId;
        user.oauth_token = userData.accessToken;
        user.oauth_expires_at = null;
        user.name = userData.givenName;
        user.surname = userData.familyName;
        user.email = userData.email;
        user.photo = {
          url: userData.imageUrl,
        };
        user.provider = 'Google'
        resolve(user);
      })
      .catch(error => reject(error));
    });
  }

  logout() {
    GooglePlus.logout()
    .then(() => console.log('successfully logout from facebook'))
    .catch(error => console.log('error google logout ' + error.message));
  }

}
