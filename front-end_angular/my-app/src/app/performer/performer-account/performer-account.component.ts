/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { PrivateUsersService } from 'src/app/services/private-users.service';
import { LegalUsersService } from 'src/app/services/legal-users.service';
import { CountriesService } from 'src/app/services/countries.service';
import { AdminUsersService } from 'src/app/services/admin-users.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-performer-account',
  templateUrl: './performer-account.component.html',
  styleUrls: ['./performer-account.component.css']
})

/* Module view using class. */
export class PerformerAccountComponent implements OnInit {

  saved: boolean = false;
  privateusers: any = [];
  legalusers: any = [];
  adminusers: any = [];
  countries: any = [];
  changingLegalUserData: any = {};
  changingPrivateUserData: any = {};

  /* Using services. */
  constructor(private authService: AuthService, private privateUsersService: PrivateUsersService, private legalUsersService: LegalUsersService, private adminUsersService: AdminUsersService, private countriesService: CountriesService, private router: Router) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
    this.saved = false;
  }

  /* Load data to variable using counties service. Fetch data functions call. */
  fetchData1() {
    this.fetchData2();
    this.fetchData3();
    this.fetchData4();
    this.countriesService.getAllCountries().subscribe(country => {
      this.countries = country;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using legal users service. */
  fetchData2() {
    this.legalUsersService.getAllLegalUsers().subscribe(user => {
      this.legalusers = user;
      for (var i = 0; i < this.legalusers.length; i++) {
        if (this.legalusers[i].UserID == (this.authService.getLoggedInUser()).UserID) {
          this.changingLegalUserData = this.legalusers[i];
        }
      }
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using private users service. */
  fetchData3() {
    this.privateUsersService.getAllPrivateUsers().subscribe(user => {
      this.privateusers = user;
      for (var i = 0; i < this.privateusers.length; i++) {
        if (this.privateusers[i].UserID == (this.authService.getLoggedInUser()).UserID) {
          this.changingPrivateUserData = this.privateusers[i];
        }
      }
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using admin users service. */
  fetchData4() {
    this.adminUsersService.getAllAdminUsers().subscribe(user => {
      this.adminusers = user;
    },
      err => {
        console.log(err);
      });
  }

  /* Update legal user data using a service. Only for legal users. */
  updateLegalUser() {
    if (this.changingLegalUserData.CompanyName && this.changingLegalUserData.CountryID != 'none' && this.changingLegalUserData.PhoneNumber && this.changingLegalUserData.Email && this.changingLegalUserData.Password) {
      if (!this.privateusers.find(user => user.Email == this.changingLegalUserData.Email) && !this.adminusers.find(user => user.Email == this.changingLegalUserData.Email) && !this.legalusers.find(user => user.Email == this.changingLegalUserData.Email && user.UserID != this.changingLegalUserData.UserID)) {
        this.legalUsersService.updateLegalUser(this.changingLegalUserData).subscribe(() => { this.fetchData2(); });
        this.saved = true;
      } else {
        alert("User with this email is already registered!");
      }
    } else {
      alert("Input or select fields must not be empty!");
    }
  }

  /* Update private user data using a service. Only for private users. */
  updatePrivateUser() {
    if (this.changingPrivateUserData.Name && this.changingPrivateUserData.Surname && this.changingPrivateUserData.CountryID != 'none' && this.changingPrivateUserData.PhoneNumber && this.changingPrivateUserData.Email && this.changingPrivateUserData.Password) {
      if (!this.legalusers.find(user => user.Email == this.changingPrivateUserData.Email) && !this.adminusers.find(user => user.Email == this.changingPrivateUserData.Email) && !this.privateusers.find(user => user.Email == this.changingPrivateUserData.Email && user.UserID != this.changingPrivateUserData.UserID)) {
        this.privateUsersService.updatePrivateUser(this.changingPrivateUserData).subscribe(() => { this.fetchData3(); });
        this.saved = true;
      } else {
        alert("User with this email is already registered!");
      }
    } else {
      alert("Input or select fields must not be empty!");
    }
  }

  /* Undo changes. */
  undoChanges() {
    this.router.navigate(['/performer/services']);
  }
}
