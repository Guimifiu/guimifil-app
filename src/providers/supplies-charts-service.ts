import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../config/environment-development';
import { API } from '../config/guimifiu-api';
import { User } from '../models/user';

@Injectable()
export class SuppliesChartsService {

  endpoint = ENV.API_URL + 'users/';

  constructor(public http: Http) {
    console.log('Hello Supplies Charts Provider');
  }

  monthlyChart(user: User): Promise<Object> {
    return new Promise((resolve, reject) => {
      let url = this.endpoint + user.id + '/charts/monthly'
      console.log('url:' + url);
      this.http
        .get(url, API.options)
        .map(res => res.json())
        .subscribe(
          data => resolve(data),
          error => reject(error),
          () => console.log("Got Monthly chart")
        );
    });
  }
}
