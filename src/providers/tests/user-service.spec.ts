import { UserService } from '../user-service';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../../config/environment-development';
import { API } from '../../config/guimifiu-api';
import { User } from '../../models/user';

let userService : UserService;
let user : User;

describe('User Service', () => {
 
    beforeEach(() => {
        userService = new UserService();
        user = new User(1,"Godinho","Matheus","godinho@matheus.com");
    });

    afterEach(() =>{
        userService = null;
        user = null;
    });

    it('returns the correct user', () => {
 
        let userTest = userService.getUser("godinho@matheus.com");
        expect(userTest.name).toBe(user.Name);
 
    });

    it('creates a new user', () => {
 
        let newUser = new User(2, "Test", "Test", "test@test.com");
        userService.create(newUser);
        let userTest = userService.getUser("test@test.com");
        expect(userTest.name).toBe(newUser.Name);
 
    });
 
});
