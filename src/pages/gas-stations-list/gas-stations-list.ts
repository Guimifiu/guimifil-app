import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LatLng } from '@ionic-native/google-maps'

import { MapService } from '../../providers/map-service';
import { LoadingService } from '../../providers/loading-service';
import { GasStationService } from '../../providers/gas-station-service';
import { GasStation } from '../../models/gas-station';

@Component({
  selector: 'page-gas-stations-list',
  templateUrl: 'gas-stations-list.html',
  providers: [
    MapService,
    GasStationService,
    LoadingService,
    Geolocation
  ]
})
export class GasStationsListPage {

  gasStations: Array<GasStation>;

  constructor(
    public navCtrl: NavController,
    private mapService: MapService,
    private gasStationService: GasStationService,
    private loadingService: LoadingService,
    private geolocation: Geolocation,
  ) {

  }

  ngOnInit() {
    this.loadingService.showLoading('Carregando Postos...');
    this.getUserCurrentLocation()
      .then(latLng => {
        let lat = latLng['lat']
        let lng = latLng['lng']
        this.gasStationService
        .getClosestGasStations(lat, lng)
        .then(gasStations => {
          this.gasStations = gasStations
          this.loadingService.dismissLoading()
        })
      }).catch(error => {
        this.loadingService.dismissLoading();
      });
  }

  getUserCurrentLocation(): Promise<void | LatLng> {
    return this.geolocation.
      getCurrentPosition().
      then((response) => {
        let location = new LatLng(response.coords.latitude, response.coords.longitude);
        return location;
      }).catch((error) => {
        console.log('Error getting location', error);
    });
  }

}
