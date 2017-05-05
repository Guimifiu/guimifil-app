import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {

  constructor(private toastCtrl: ToastController) {
  }

  presentToast(message: string, type?: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      cssClass: type
    }).present();
  }

}
