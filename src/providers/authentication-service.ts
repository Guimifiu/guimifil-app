import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserService } from './user-service';
import { User } from '../models/user';
import { FacebookService } from '../providers/facebook-service';
import { GoogleService } from '../providers/google-service';
import { UserData } from '../providers/user-data';

@Injectable()
export class AuthenticationService {

  constructor(
    public userService: UserService,
    private facebookService:FacebookService,
    private googleService: GoogleService,
    private userData: UserData,
  ) {
    console.log('Hello AuthenticationService Provider');
  }

  register(user: User) {
    return new Promise((resolve, reject) => {
      this.userService
      .create(user)
      .then(user => {
        this.userData.login(user);
        resolve(user);
      })
      .catch(error => reject(error))
    })
  }

  nativeLogin(user) {
    return new Promise((resolve, reject) => {
      this.userService.authenticate(user)
      .then((user) => {
        this.userData.login(user)
        resolve(user);
      }, error => reject(error));
   });
 }

  googleLogin() {
    return new Promise((resolve, reject) => {
      //just to hold googleUser if its not registered
      let user: User;
      this.googleService
      .login()
      .then(googleUser => {
        user = googleUser;
        //Search if user is already registerd
        return this.userService.getUser(user.email);
      })
      //If he is, then log he in
      .then(user => {
        this.userData.login(user);
        resolve();
      })
      .catch(error => {
        if (error.status == 404) {
          reject(user);
        } else {
          reject(error);
        }
      });
    });
  }

  facebookLogin() {
    return new Promise((resolve, reject) => {
      //just to hold fbUser if its not registered
      let user: User;
      this.facebookService
      .login()
      .then(fbUser => {
        user = fbUser;
        //Search if user is already registerd
        return this.userService.getUser(user.email);
      })
      //If he is, then log he in
      .then(user => {
        this.userData.login(user);
        resolve();
      })
      .catch(error => {
        if(error.status == 404) {
          reject(user);
        } else {
          reject(error);
        }
      });
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
      this.userData.logout();
      this.facebookService.logout();
      this.googleService.logout();
      resolve();
    })
  }

}
