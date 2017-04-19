import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { User } from '../../../models/user';
import { UserService } from '../../../providers/user-service';

describe('Unit test: Providers: UserService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        UserService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http, 
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
    imports: [ HttpModule ]
    }).compileComponents();
  }));
 
  beforeEach(() => {

  });

  describe('getUser()', () => {
    it('should get an user', inject([UserService, MockBackend], (userService, mockBackend) => {
          let user = new User();
          const mockResponse = {
            "id": 1,
            "email": "apptest@apptest.com",
            "created_at": "2017-04-19T01:06:15.145Z",
            "updated_at": "2017-04-19T01:06:15.145Z",
            "name": "App",
            "surname": "Teste",
            "document_number": null,
            "phone": null,
            "uid": null,
            "oauth_token": null,
            "provider": null
          }
  
          mockBackend.connections.subscribe((connection) => {
              connection.mockRespond(new Response(new ResponseOptions({
                  body: mockResponse
              })));
          });

          userService.getUser('apptest@apptest.com')
          .then(response => {
            user = response;
            expect(user.name).toBe('App');
            expect(user.surname).toBe('Teste');
          })
      }));
  });

  describe('authenticateUser()', () => {
    it('should authenticate an user', inject([UserService, MockBackend], (userService, mockBackend) => {
        let user = new User();
        const mockResponse = {
          "id": 1,
          "email": "apptest@apptest.com",
          "name": "App",
          "surname": "Teste",
          "document_number": null,
          "phone": null,
          "uid": null,
          "oauth_token": null,
          "provider": null,
          "password": null
        }
        user = mockResponse as User;
 
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse
            })));
        });

        userService.authenticate(user)
        .then(response => {
          user = response;
          expect(user.name).toBe('App');
          expect(user.surname).toBe('Teste');
        })
    }));
  });
});
