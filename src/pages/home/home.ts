import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from '../../models/user';
import { UserData } from '../../providers/user-data'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser = new User();

  constructor(
    public navCtrl: NavController,
    private userData: UserData,
  ) {}

  ngOnInit() {
    this.currentUser = this.userData.currentUser;
  }

}
