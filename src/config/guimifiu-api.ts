import { ENV } from '../config/environment-dev';
import { Headers, RequestOptions } from '@angular/http';

let headers = new Headers();
headers.append('Authorization', 'Token token=' + ENV.API_TOKEN);

export const API = {
  options: new RequestOptions({ headers: headers })
};
