import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { 
  GoogleMaps, 
  GoogleMap, 
  GoogleMapsEvent, 
  LatLng, 
  CameraPosition,
  MarkerOptions,
  Marker,
  GoogleMapsAnimation,
} from '@ionic-native/google-maps' 
import { Geolocation } from '@ionic-native/geolocation';

import { GasStationService } from '../../providers/gas-station-service';
import { MapService } from '../../providers/map-service';
import { LoadingService } from '../../providers/loading-service';
import { GasStation } from '../../models/gas-station';
import { SearchPlacePage } from '../search-place/search-place';
 
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [
    GoogleMaps,
    GasStationService,
    LoadingService,
    Geolocation,
    MapService
  ]
})
export class HomePage {
 
    gasStations: GasStation[] = [];
    map: GoogleMap;
    searchedPlace = '';

    constructor(
      public navCtrl: NavController, 
      public platform: Platform,
      private googleMaps: GoogleMaps,
      private gasStationService: GasStationService,
      private loadingService: LoadingService,
      private geolocation: Geolocation,
      private modalController: ModalController,
      private mapService: MapService
    ){
      platform.ready().then(() => {
          this.loadMap();
      });
    }
 
    ngOnInit(){
      this.getAllGasStations();
      if(this.map != null)
        this.map.setClickable(true);
        
    }

    getAllGasStations() {
      this.loadingService.showLoading('Carregando Postos...');
      this.gasStationService
        .getAll()
        .then(gasStations => {
          for(var i in gasStations)
            this.gasStations.push(gasStations[i]);
        }).then(() => {
          this.loadingService.dismissLoading();
          this.plotGasStationsOnMap();
        });
      }

    plotGasStationsOnMap() {
      for(var i in this.gasStations){
        let location = new LatLng(parseFloat(this.gasStations[i].latitude), parseFloat(this.gasStations[i].longitude));
        let markerOptions: MarkerOptions = {
          position: location,
          snippet: this.gasStations[i].vicinity,
          title: this.gasStations[i].name,
          icon: { url : 'assets/images/pump_map.png', size: { height: 40, width: 25 } },
          infoClick: () => {
            alert("Informações do posto");
          }
        }; 

        this.map.addMarker(markerOptions)
        .then((marker: Marker) => {
          
        });
      }
    }

    getUserCurrentLocation(): Promise<LatLng> {
      return this.geolocation.
        getCurrentPosition().
        then((response) => {
          let location = new LatLng(response.coords.latitude, response.coords.longitude);
          return location;
        }).catch((error) => {
          console.log('Error getting location', error);
      });
    }

    loadMap(){
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
      this.map = new GoogleMap(mapElement, mapOptions);
      this.mapService.currentMap = this.map;

      this.map.one(GoogleMapsEvent.MAP_READY)
      .then( () => {
        this.mapService.moveCameraToCurrentPosition();
      });
    }

    showSearchPlaceModal () {
      let modal = this.modalController.create(SearchPlacePage);
      modal.onDidDismiss(data => {
        this.mapService.enableMap()
        this.searchedPlace = data;
        this.moveCameraToDestinationMarker();
      });
      this.mapService.disableMap();
      modal.present();
    }

    moveCameraToDestinationMarker() {
      if (this.searchedPlace != '') {
        this.mapService.getPositionFromAddress(this.searchedPlace)
        .then(result => {
          let position = new LatLng(result.position.lat, result.position.lng)
          this.mapService.addDestinationMarker(position);
          this.mapService.moveCameraToPosition(position);
        }).catch(error => console.log(JSON.stringify(error)));
        
      }
    }
}