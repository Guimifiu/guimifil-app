export class User {

  id: number;
  name: string;
  surname: string;
  email: string;
  photo: {
    url: string;
  };
  password: string;
  provider: string;
  uid: string;
  oauth_token: string;
  oauth_expires_at: number;
  device_token: string;

  constructor() {

  }
}