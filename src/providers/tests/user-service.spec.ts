import { UserService } from '../user-service';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../../config/environment-development';
import { API } from '../../config/guimifiu-api';
import { User } from '../../models/user';

var userService : UserService;
var user : User;

describe('User Service', () => {

    beforeEach(() => {
        user = new User();
    });

    afterEach(() =>{
        user = null;
    });

    it('returns the correct user', () => {
        user.name = 'apptest';
        user.email = 'test@apptest.com';
        var userTest = new User();
        userService.getUser('test@apptest.com')
        .then(user => {
            userTest = user;
            console.log(JSON.stringify(userTest));
        })
        expect(userTest.name).toBe(user.name);

    });

    it('creates a new user', () => {
        user.name = 'newapptest';
        user.email = 'newtest@apptest.com';
        userService.create(user)
        .then(response => {
            var userTest = new User();
            userService.getUser("newtest@apptest.com");
            expect(userTest.name).toBe(user.name); 
        })
    });

});
