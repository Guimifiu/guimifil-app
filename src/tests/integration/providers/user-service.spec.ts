import {HttpModule} from '@angular/http';
import {async, TestBed,getTestBed } from '@angular/core/testing';

import { User } from '../../../models/user';
import { UserService } from '../../../providers/user-service';

let userService: UserService;
let user : User;

describe('Integration test: Providers: UserService', () => {
  beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports: [HttpModule],
     providers:[UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    user = new User();
    user.email = 'apptest@apptest.com';
    user.password = '12345678';
    userService = getTestBed().get(UserService);
    userService.create(user);
  })

  afterEach(() => {
    userService.delete(user);
  })

  describe('getUser()', () => {
    it('should get User', async(() => {
      let user = new User();
      userService.getUser('apptest@apptest.com')
      .then(response => {
        user = response;
        expect(user.name).toBe('App');
        expect(user.surname).toBe('Teste');
      })
    }));
  });

  describe('authenticate()', () => {
    it('should authenticate an user', async(() => {
      userService.authenticate(user)
      .then(response => {
        user = response as User;
        expect(user.name).toBe('App');
        expect(user.surname).toBe('Teste');
      })
    }));

    it('should return "Email ou senha inválidos"', async(() => {
      let fakeUser = new User();
      fakeUser.email = 'apptestfake@apptestfake.com';
      fakeUser.password = '12345678'
      userService.authenticate(fakeUser)
      .then(response => {
      })
      .catch(error => expect(error).toBe("Email ou senha inválidos"));
    }));

    it('should return "Email ou senha inválidos"', async(() => {
      let fakeUser = new User();
      fakeUser.email = 'apptest@apptest.com';
      fakeUser.password = 'fake'
      userService.authenticate(fakeUser)
      .then(response => {
      })
      .catch(error => expect(error).toBe("Email ou senha inválidos"));
    }));

  }); 

})
