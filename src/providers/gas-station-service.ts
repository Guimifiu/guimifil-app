import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../config/environment-development';
import { API } from '../config/guimifiu-api';
import { GasStation } from '../models/gas-station';

@Injectable()
export class GasStationService {

  endpoint = ENV.API_URL + 'gas-stations/';
  endpointRefactor =  ENV.API_URL + 'gas_stations/';

  constructor(public http: Http) {
    console.log('Hello GasStation Provider');
  }

  getAll(): Promise<GasStation[]> {
    return new Promise((resolve, reject) => {
      let url = this.endpoint
      console.log('url:' + url);
      this.http
        .get(url, API.options)
        .map(res => res.json())
        .subscribe(
          data => resolve(data as GasStation[]),
          error => reject(error),
          () => console.log("User created")
        );
    });
  }

  getGasStation(gasStationId: number): Promise<GasStation> {
    return new Promise((resolve, reject) => {
      let url = this.endpointRefactor + gasStationId;
      console.log('url:' + url);
      this.http
        .get(url, API.options)
        .map(res => res.json())
        .subscribe(
          data => resolve(data as GasStation),
          error => reject(error),
          () => console.log("User created")
        );
    });
  }

  getClosestGasStations(latitude, longitude): Promise<GasStation[]> {
    return new Promise((resolve, reject) => {
      let url = `${this.endpoint}closest?latitude=${latitude}&longitude=${longitude}`
      console.log('url:' + url);
      this.http
        .get(url, API.options)
        .map(res => res.json())
        .subscribe(
          data => resolve(data as GasStation[]),
          error => reject(error),
          () => console.log("User created")
        );
    });
  }

}
