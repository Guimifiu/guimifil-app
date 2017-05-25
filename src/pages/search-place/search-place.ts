import { Component, NgZone, ViewChild} from '@angular/core';
import { NavController, NavParams, ViewController, Searchbar} from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native'


@Component({
  selector: 'page-search-place',
  templateUrl: 'search-place.html'
})
export class SearchPlacePage {

  @ViewChild('searchbar') searchbar: Searchbar;
  autocompleteItems = [];
  query = '';
  googleMapsService = new google.maps.places.AutocompleteService();
 
  constructor (
    public viewController: ViewController, 
    private zone: NgZone
  ) {}
 
  ionViewDidLoad() { 
    setTimeout(() => { 
      this.searchbar.setFocus();
    }, 150); 
  }

  dismiss() {
    this.viewController.dismiss('');
  }
 
  chooseItem(item: any) {
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
            currentPage.
            autocompleteItems.
            push([prediction['structured_formatting']['main_text'], prediction['structured_formatting']['secondary_text']]);
          });
        });
      }
    );
  }

}
