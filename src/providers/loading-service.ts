import { Injectable } from '@angular/core';
import { AlertController, Loading, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class LoadingService {

  loading: Loading;
  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  showLoading(message: string) {
    this.loading = null;
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="preloader-container">
          <div class="preloader-container__spin loader">
            <div class="line-scale"><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div class="preloader-container__content">${message}</div>
        </div>`,
      });
    this.loading.present();
  }

  showDefaultLoading(content: string) {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando...',
    });
    this.loading.present();
  }

  dismissLoading(){
    if(this.loading) {
      this.loading.dismiss();
    }
  }

}
