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
import { Geofence } from '@ionic-native/geofence';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

import { GasStationService } from '../../providers/gas-station-service';
import { FirebasePushService } from '../../providers/firebase-push-service';
import { MapService } from '../../providers/map-service';
import { LoadingService } from '../../providers/loading-service';
import { GasStation } from '../../models/gas-station';
import { Place } from '../../models/place';
import { SearchPlacePage } from '../search-place/search-place';
import { FuelSupply } from '../../models/fuel-supply';
import { AtGasStationPage } from '../at-gas-station/at-gas-station';
import { FuelSupplyService } from '../../providers/fuel-supply-service';
import { UserData } from '../../providers/user-data';
import { RatingService } from '../../providers/rating-service';
import { Rating } from '../../models/rating';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [
    GoogleMaps,
    GasStationService,
    LoadingService,
    Geolocation,
    MapService,
    Geofence,
    FuelSupplyService,
    RatingService,
    FirebasePushService,
    LaunchNavigator
  ]
})

export class HomePage {
    map: GoogleMap;

    constructor(
      public navCtrl: NavController,
      public platform: Platform,
      private googleMaps: GoogleMaps,
      private gasStationService: GasStationService,
      private loadingService: LoadingService,
      private geolocation: Geolocation,
      private modalController: ModalController,
      private mapService: MapService,
      private geofence: Geofence,
      public modalCtrl: ModalController,
      public fuelSupplyService: FuelSupplyService,
      public userData: UserData,
      public ratingService: RatingService,
      public firebasePushService: FirebasePushService,
      private launchNavigator: LaunchNavigator
    ){
      platform.ready().then(() => {
          this.loadMap();
          this.configMap();
      });
      geofence.initialize().then(
        // resolved promise does not return a value
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      )
    }

    configMap(){
      if(this.map != null)
        this.map.setClickable(true);
      if(this.mapService.currentMap != null)
        this.getClosestGasStations();
    }

    getClosestGasStations() {
      this.mapService.currentMap.clear();
      this.loadingService.showLoading('Carregando Postos...');
      this.getUserCurrentLocation()
        .then(currentPosition => {
          let lat = currentPosition['lat'];
          let lng = currentPosition['lng'];
          this.gasStationService
          .getClosestGasStations(lat, lng)
          .then(gasStations => {
            this.plotGasStationsOnMap(gasStations);
            this.createGeofences(gasStations);
            this.loadingService.dismissLoading()
          })
        }).catch(error => {
          console.log(JSON.stringify(error));
          this.loadingService.dismissLoading();
        });
      }

    createGeofences(gasStations){
      var count = 0;
      for(var i in gasStations) {
        if(count < 50) {
          this.addGeofence(gasStations[i]);
        }
        count++;
      }
    }

    plotGasStationsOnMap(gasStations) {
      for(var i in gasStations){
        let location = new LatLng(parseFloat(gasStations[i].latitude), parseFloat(gasStations[i].longitude));
        let markerOptions: MarkerOptions = {
          position: location,
          // snippet: gasStations[i].vicinity,
          snippet: "Clique para ir",
          flat: true,
          title: gasStations[i].name,
          icon: { url : `./assets/images/${gasStations[i].icon}.png`, size: { height: 30, width: 25 } },
          infoClick: () => {
            this.openNavigationApps(gasStations[i]);
          }
        };

        this.map.addMarker(markerOptions)
        .then((marker: Marker) => {

        });
      }
    }

    getUserCurrentLocation() {
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

    handleSearchPlaceInformation(searchedPlace) {
      if (searchedPlace.vicinity != '') {
        this.loadingService.showLoading('Buscando Postos...')
        this.mapService.currentMap.clear();
        this.mapService.getPositionFromAddress(searchedPlace.id)
        .then(place => {
          let position = new LatLng(parseFloat(place.latitude), parseFloat(place.longitude))
          this.mapService.moveCameraToPosition(position);
          this.mapService.addDestinationMarker(place, position);
          this.getGasStationsOnDirection(place);
        }).catch(error => console.log(JSON.stringify(error)))
      }
    }

    getGasStationsOnDirection(searchedPlace) {
      this.mapService
        .getCurrentPosition()
        .then(currentPosition => {
          this.mapService.
            getGasStationsOnDirection(
              currentPosition.latLng.lat,
              currentPosition.latLng.lng,
              searchedPlace.latitude,
              searchedPlace.longitude
            ).then(gasStations => {
              this.plotGasStationsOnMap(gasStations);
            }).then(() => this.loadingService.dismissLoading())
        }).catch(error => {
          this.loadingService.dismissLoading()
          console.log(JSON.stringify(error))
        })
    }
    private addGeofence(gasStation) {
      let fence = {
          id:             gasStation.id,
          latitude:       parseFloat(gasStation.latitude),
          longitude:      parseFloat(gasStation.longitude),
          radius:         20,
          transitionType: 1,
      }

      this.geofence.addOrUpdate(fence).then(
         () => console.log('Geofence added'),
         (err) => console.log('Geofence failed to add')
       );

       this.geofence.onTransitionReceived().subscribe(resp => {
         this.gasStationService.getGasStation(resp[0].id)
          .then(gasStation => {
            this.firebasePushService.atGasStationNotification(this.userData.currentUser, gasStation);
            this.presentAtGasStationPage(gasStation);
          }).catch(error => console.log(JSON.stringify(error)))
       });
   }

   presentAtGasStationPage(gasStation: GasStation) {
     console.log("PASSOU AQUI TAMBEM");
    let modal = this.modalCtrl.create(AtGasStationPage, { "gasStation": gasStation });
    modal.onDidDismiss(data => {
      var fuelSupply = new FuelSupply();
      fuelSupply.boycotted = false; //TODO get if gas station is boycotted
      fuelSupply.fuelled = data.fuelled;
      fuelSupply.gas_station_id = gasStation.id;
      if(data.formData) {
        fuelSupply.value = data.formData.fuel_supply_value;
        fuelSupply.fuel_type = data.formData.fuel_type;
      }
      this.fuelSupplyService.create(this.userData.currentUser, fuelSupply)
      .then(fuelSupply => {
        if(data.formData) {
          var rating = new Rating();
          rating.stars = data.formData.gas_station_rate;
          rating.gas_station_id = gasStation.id;
          rating.fuel_supply_id = fuelSupply.id;
          this.ratingService.create(this.userData.currentUser, rating)
          .then(rating => console.log(JSON.stringify(rating)))
        }
      })
      .catch(error => console.log(JSON.stringify(error)))
      .then(() => this.mapService.enableMap());
    });
    this.mapService.disableMap();
    modal.present();
  }

  openNavigationApps(gasStation) {
    let options: LaunchNavigatorOptions = {
      start: ''
    };
    let destination = [gasStation.latitude, gasStation.longitude]
    this.launchNavigator.navigate(destination, options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }


}
