import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';

import { ENV } from '../config/environment-development';
import { User } from '../models/user';

@Injectable()
export class GoogleService {

  private permissions = {
    'scopes': 'email profile',
    'webClientId': ENV.GOOGLE_APP_WEB_ID,
    'offline': false
  }

  constructor(
    private googlePlus: GooglePlus
  ) {}

  login(): Promise<User> {
    return new Promise((resolve, reject) => {
      let user = new User;
      this.googlePlus
      .login(this.permissions)
      .then(userData => {
        user.uid = userData.userId;
        user.oauth_token = userData.accessToken;
        let userFullName = userData.displayName
        user.name = userFullName.split(" ")[0];
        user.surname = userFullName.split(" ").slice(1).join(' ');
        user.email = userData.email;
        user.photo = {
          url: userData.imageUrl,
        };
        user.provider = 'google'
        resolve(user);
      })
      .catch(error => {
        reject(error)}
      );
    });
  }

  logout() {
    this.googlePlus.logout()
    .then(() => console.log('successfully logout from facebook'))
    .catch(error => console.log('error google logout ' + error.message));
  }

}
