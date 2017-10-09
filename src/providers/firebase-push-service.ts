import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../config/environment-development';
import { API } from '../config/guimifiu-api';
import { GasStation } from '../models/gas-station';
import { User } from '../models/user';

@Injectable()
export class FirebasePushService {

  endpoint = ENV.API_URL + 'push_notifications/';

  constructor(public http: Http) {
    console.log('Hello PushNotification Provider');
  }

  atGasStationNotification(user: User, gasStation: GasStation): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = this.endpoint + 'at_gas_station_notification'
      let body = { 
        'push_notification': {
          'user_device_token': user.device_token,
          'gas_station_id': gasStation.id
        }
      }
      console.log('url:' + url);
      console.log('body:' + JSON.stringify(body));
      this.http
        .post(url, body, API.options)
        .map(res => res.json())
        .subscribe(
          data => resolve(data),
          error => reject(error),
          () => console.log("User created")
        );
    });
  }
}
