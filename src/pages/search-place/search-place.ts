import { Component, NgZone} from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native'


@Component({
  selector: 'page-search-place',
  templateUrl: 'search-place.html'
})
export class SearchPlacePage {

  autocompleteItems = [];
  query = '';
  googleMapsService = new google.maps.places.AutocompleteService();
 
  constructor (
    public viewController: ViewController, 
    private zone: NgZone
  ) {}
 
  dismiss() {
    console.log("CLICK");
    this.viewController.dismiss('');
  }
 
  chooseItem(item: any) {
    console.log("CLICKou")
    this.viewController.dismiss(item);
  }
  
  updateSearch() {
    if (this.query == '') {
      this.autocompleteItems = [];
      return;
    }
    this.googleMapsService
    .getPlacePredictions(
      { 
        input: this.query, 
        componentRestrictions: {country: 'BR'} 
      }, 
      (predictions, status) => {
        this.autocompleteItems = []; 
        let currentPage = this;
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            currentPage.autocompleteItems.push(prediction.description);
          });
        });
      }
    );
  }

}
