import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { 
  GoogleMaps, 
  GoogleMap, 
  GoogleMapsEvent, 
  LatLng, 
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps' 
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [GoogleMaps]
})
export class HomePage {
 
    // TODO
    // Create a service to google maps
    constructor(
      public navCtrl: NavController, 
      public platform: Platform,
      private googleMaps: GoogleMaps
    ){
      platform.ready().then(() => {
          this.loadMap();
      });
    }
 
    loadMap(){
      let location = new LatLng(-15.796450, -47.896521);

      let mapOptions = {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        }
      }

      let mapElement: HTMLElement = document.getElementById('map');
      let map = new GoogleMap(mapElement, mapOptions);

      map.one(GoogleMapsEvent.MAP_READY)
      .then( () => {
        console.log('Map is ready!');
      });
 
    

      let position: CameraPosition = {
        target: location,
        zoom: 18,
        tilt: 30
      };

      map.moveCamera(position);

      let markerOptions: MarkerOptions = {
        position: location,
        title: 'Price:'
      }; 

      let marker = map.addMarker(markerOptions)
      .then((marker: Marker) => {
          marker.showInfoWindow();
      });
    }
}