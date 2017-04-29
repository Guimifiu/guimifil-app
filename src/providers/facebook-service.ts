import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

@Injectable()
export class FacebookService {

  permissions = ['public_profile', 'email'];
  fbRequestPath = '/me?fields=first_name,last_name,email';
  
  constructor(
    private facebook: Facebook
  ) {}

  login(): Promise<User> {
    return new Promise((resolve, reject) => {
      let user = new User;
      this.facebook
      .login(this.permissions)
      .then(fbReponse => {
        user.uid = fbReponse.authResponse.userID;
        user.oauth_token = fbReponse.authResponse.accessToken;
        return this.fetchUserData()
      })
      .then((profile_data: any) => {
        user.name = profile_data.first_name;
        user.surname = profile_data.last_name;
        user.email = profile_data.email;
        return this.getUserPicture(user.uid)
      })
      .then((photo: any) => {
        user.photo = {
          url: photo,
        };
        user.provider = 'facebook';
        resolve(user);
      })
      .catch(error => reject(error));
    });
  }

  fetchUserData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.facebook
      .api(this.fbRequestPath, null)
      .then(userProfileData => {
        resolve(userProfileData);
      })
      .catch(error => reject(error));
    });
  }

  getUserPicture(userId) {
    return new Promise((resolve,reject) => {
      let picturePath = '/me/?fields=picture.type(large)&redirect=false'
      this.facebook
      .api(picturePath, null)
      .then(response => {
        resolve(response.picture.data.url);
      })
      .catch(error => reject(error));
    });
  }

  logout() {
    this.facebook.logout()
    .then(() => console.log('successfully logout from facebook'))
    .catch(() => console.log('error facebook logout'));
  }
}
