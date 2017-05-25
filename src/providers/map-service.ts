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


@Injectable()
export class MapService {
  currentMap: GoogleMap;
  destinationMarker: Marker;
  constructor(
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


  addDestinationMarker(position: LatLng) {
    this.removeDestinationMarker()
    let markerOptions: MarkerOptions = {
      position: position,
      animation: GoogleMapsAnimation.DROP
    }
    return this.currentMap.addMarker(markerOptions)
      .then(marker => {
        this.destinationMarker = marker
      })
      .then(() => this.moveCameraToPosition(position))
  }


  moveCameraToPosition(position: LatLng) {
    let cameraPosition: CameraPosition = {
      target: position,
      zoom: 16,
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

  geocode(request: GeocoderRequest) {
    return new Promise((resolve, reject) => {
      this.geoCoder.geocode(request).then(results => {
        if (results.length) {
          var result = results[0];
          resolve(result);
        } else {
          reject(new Error('Não foram encontrado resultados'))
        }
      })
    });
  }


  getPositionFromAddress(address: string): Promise<GeocoderResult> {
    let request = {
      address: address
    }
    return this.geocode(request);
  }

}
