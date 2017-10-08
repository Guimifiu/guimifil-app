import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../config/environment-development';
import { API } from '../config/guimifiu-api';
import { Rating } from '../models/rating';
import { User } from '../models/user';

@Injectable()
export class RatingService {

  endpoint = ENV.API_URL + 'users/';

  constructor(public http: Http) {
    console.log('Hello GasStation Provider');
  }

  create(user: User, rating: Rating): Promise<Rating> {
    return new Promise((resolve, reject) => {
      let url = this.endpoint + user.id + '/ratings'
      let body = { 'rating': rating }
      console.log('url:' + url);
      console.log('body:' + JSON.stringify(body));
      this.http
        .post(url, body, API.options)
        .map(res => res.json())
        .subscribe(
          data => resolve(data),
          error => reject(error),
          () => console.log("Rating created")
        );
    });
  }

}
