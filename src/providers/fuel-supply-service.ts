import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../config/environment-development';
import { API } from '../config/guimifiu-api';
import { FuelSupply } from '../models/fuel-supply';

@Injectable()
export class FuelSupplyService {

  endpoint = ENV.API_URL + 'fuel_supplies/';

  constructor(public http: Http) {
    console.log('Hello GasStation Provider');
  }

  create(fuelSupply: FuelSupply): Promise<FuelSupply> {
    return new Promise((resolve, reject) => {
      let url = this.endpoint
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
