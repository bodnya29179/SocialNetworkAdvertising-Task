import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/* Service for get and set authorized user info. */

export class AuthService {

  loggedInUser: any = {};
  registeredUser: any = {};

  constructor() { }

  /* Write to variable authorized user data. */
  setLoggedInUser(user) {
    this.loggedInUser = user;
  }

  /* Get authorized user data. */
  getLoggedInUser() {
    return this.loggedInUser;
  }

  /* Registered user's data record to variable. */
  setRegisteredUser(user) {
    this.registeredUser = user;
  }

  /* Get registered user's data. */
  getRegisteredUser() {
    return this.registeredUser;
  }
}
