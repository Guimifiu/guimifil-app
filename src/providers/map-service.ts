import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular'
import { 
  GoogleMaps, 
  GoogleMap, 
  GoogleMapsEvent, 
  LatLng, 
  CameraPosition,
  MarkerOptions,
  Marker,
  GoogleMapsAnimation,
  GeocoderResult,
  Geocoder, 
  GeocoderRequest
} from '@ionic-native/google-maps' 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../config/environment-development';
import { API } from '../config/guimifiu-api';
import { Place } from '../models/place';
import { GasStation } from '../models/gas-station';


@Injectable()
export class MapService {
  currentMap: GoogleMap;
  destinationMarker: Marker;
  constructor(
    public http: Http,
    private events: Events,
    private geoCoder: Geocoder,
  ) { }

  enableMap() {
    if (this.currentMap) {
      console.log('-------->>>>> Map activated');

      this.currentMap.setClickable(true);
    }
  }

  disableMap() {
    if (this.currentMap) {
      console.log('-------->>>>> Map deactivated');

      this.currentMap.setClickable(false);
    }
  }

  removeDestinationMarker() {
    if (this.destinationMarker) {
      this.destinationMarker.remove();
      this.destinationMarker = null;
    }
  }


  addDestinationMarker(place: Place, position: LatLng) {
    this.removeDestinationMarker()
    let markerOptions: MarkerOptions = {
      position: position,
      title: place.name,
      snippet: place.vicinity
      // animation: GoogleMapsAnimation.BOUNCE
    }
    return this.currentMap.addMarker(markerOptions)
      .then(marker => {
        this.destinationMarker = marker
        this.destinationMarker.showInfoWindow();
      })
  }


  moveCameraToPosition(position: LatLng) {
    let cameraPosition: CameraPosition = {
      target: position,
      zoom: 10,
      tilt: 30
    }
    this.currentMap.moveCamera(cameraPosition);
  }

  moveCameraToCurrentPosition() {
    this.getCurrentPosition().then(currentPostion => {
      this.moveCameraToPosition(currentPostion.latLng);
    })
  }

  getCurrentPosition() {
    return this.currentMap.getMyLocation({ enableHighAccuracy: true });
  }

  getPositionFromAddress(place_id: string) : Promise<Place> {
    return new Promise((resolve, reject) => {
      let url =  ENV.API_URL + 'get-place-location/' + place_id;
      this.http
        .get(url, API.options)
        .map(res => res.json())
        .subscribe(
          data => resolve(data as Place),
          error => reject(error),
          () => console.log("got Position")
        );
    });
  }

  getGasStationsOnDirection(originLat, originLng, destLat, destLng) : Promise<GasStation[]> {
    return new Promise((resolve, reject) => {
      let url =  `${ENV.API_URL}get-gas-stations-on-direction?origin=${originLat},${originLng}&destination=${destLat},${destLng}`
      this.http
        .get(url, API.options)
        .map(res => res.json())
        .subscribe(
          data => resolve(data as GasStation[]),
          error => reject(error),
          () => console.log("got Gas stations on direction")
        );
    });
  }

  getDirection(originLat, originLng, destLat, destLng) : Promise<any> {
    return new Promise((resolve, reject) => {
      let url =  `${ENV.API_URL}get-direction?origin=${originLat},${originLng}&destination=${destLat},${destLng}`
      this.http
        .get(url, API.options)
        .map(res => res.json())
        .subscribe(
          data => resolve(data as any),
          error => reject(error),
          () => console.log("got direction")
        );
    });
  }


}
