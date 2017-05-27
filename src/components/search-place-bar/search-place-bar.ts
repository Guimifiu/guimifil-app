import { Component, NgZone, ViewChild, Output, EventEmitter} from '@angular/core';
import { NavController, NavParams, ViewController, Searchbar, Keyboard} from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native'

import { Place } from '../../models/place';
import { MapService } from '../../providers/map-service';
MapService

@Component({
  selector: 'search-place-bar',
  templateUrl: 'search-place-bar.html',
  providers: [MapService]
})
export class SearchPlaceBarComponent {

  @Output() search = new EventEmitter();
  autocompleteItems = [];
  searchedPlace = new Place();
  googleMapsService = new google.maps.places.AutocompleteService();
 
  constructor (
    private zone: NgZone,
    private mapService: MapService,
    public keyboard: Keyboard
  ) {
  }
 
  ionViewDidLoad() { 
  }
 
  chooseItem(item: any) {
    this.mapService.enableMap();
    this.autocompleteItems = [];
    this.searchedPlace.vicinity = item[2];
    this.searchedPlace.id = item[3];
    this.keyboard.close();
    this.search.emit(this.searchedPlace);
  }
  
  updateSearch() {
    this.mapService.disableMap();
    if (this.searchedPlace.vicinity == '') {
      this.autocompleteItems = [];
      return;
    }
    this.googleMapsService
    .getPlacePredictions(
      { 
        input: this.searchedPlace.vicinity, 
        componentRestrictions: {country: 'BR'} 
      }, 
      (predictions, status) => {
        this.autocompleteItems = []; 
        let currentPage = this;
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            currentPage.
            autocompleteItems.
            push([
              prediction['structured_formatting']['main_text'], 
              prediction['structured_formatting']['secondary_text'], 
              prediction['description'],
              prediction['place_id']
            ]);
          });
        });
      }
    );
  }

}
