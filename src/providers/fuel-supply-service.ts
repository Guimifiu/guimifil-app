import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../config/environment-development';
import { API } from '../config/guimifiu-api';
import { FuelSupply } from '../models/fuel-supply';
import { User } from '../models/user';

@Injectable()
export class FuelSupplyService {

  endpoint = ENV.API_URL + 'users/';

  constructor(public http: Http) {
    console.log('Hello GasStation Provider');
  }

  getAll(user: User): Promise<FuelSupply[]> {
    return new Promise((resolve, reject) => {
      let url = this.endpoint + user.id + '/fuel_supplies'
      console.log('url:' + url);
      this.http
        .get(url, API.options)
        .map(res => res.json())
        .subscribe(
          data => resolve(data as FuelSupply[]),
          error => reject(error),
          () => console.log("Got user fuel supplies")
        );
    });
  }

  create(user: User, fuelSupply: FuelSupply): Promise<FuelSupply> {
    return new Promise((resolve, reject) => {
      let url = this.endpoint + user.id + '/fuel_supplies'
      let body = { 'fuel_supply': fuelSupply }
      console.log('url:' + url);
      console.log('body:' + JSON.stringify(body));
      this.http
        .post(url, body, API.options)
        .map(res => res.json())
        .subscribe(
          data => resolve(data),
          error => reject(error),
          () => console.log("Fuel Supply created")
        );
    });
  }

}
