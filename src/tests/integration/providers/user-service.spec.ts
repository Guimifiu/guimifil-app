import {HttpModule} from '@angular/http';
import {async, TestBed,getTestBed } from '@angular/core/testing';

import { User } from '../../../models/user';
import { UserService } from '../../../providers/user-service';

let userService: UserService;

describe('Integration test: Providers: UserService', () => {
  beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports: [HttpModule],
     providers:[UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
     userService = getTestBed().get(UserService);
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
      let user = new User();
      user.email = 'apptest@apptest.com';
      user.password = '12345678'
      userService.authenticate(user)
      .then(response => {
        user = response as User;
        expect(user.name).toBe('App');
        expect(user.surname).toBe('Teste');
      })
    }));

    it('should return "Email ou senha inválidos"', async(() => {
      let user = new User();
      user.email = 'apptestfake@apptestfake.com';
      user.password = '12345678'
      userService.authenticate(user)
      .then(response => {
      })
      .catch(error => expect(error).toBe("Email ou senha inválidos"));
    }));

    it('should return "Email ou senha inválidos"', async(() => {
      let user = new User();
      user.email = 'apptest@apptest.com';
      user.password = 'fake'
      userService.authenticate(user)
      .then(response => {
      })
      .catch(error => expect(error).toBe("Email ou senha inválidos"));
    }));

  }); 

})
