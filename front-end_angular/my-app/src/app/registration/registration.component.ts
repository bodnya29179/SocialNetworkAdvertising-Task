/* Import all modules, libraries and services. */
import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { LegalUsersService } from '../services/legal-users.service';
import { PrivateUsersService } from '../services/private-users.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AdminUsersService } from '../services/admin-users.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

/* Module view using class. */
export class RegistrationComponent implements OnInit {

  countries: any = [];
  privateusers: any = [];
  legalusers: any = [];
  adminusers: any = [];
  data: any = {};

  /* Using services. */
  constructor(private countriesService: CountriesService, private privateUsersService: PrivateUsersService, private legalUsersService: LegalUsersService, private adminUsersService: AdminUsersService, private router: Router, private authService: AuthService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
    this.data.User = 'privateuser';
    this.data.CountryID = 'none';
    this.data.TypeID = "2";
  }

  /* Load data to variable using countries service. */
  fetchData1() {
    this.fetchData2(); this.fetchData3(); this.fetchData4();
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
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using private users service. */
  fetchData3() {
    this.privateUsersService.getAllPrivateUsers().subscribe(user => {
      this.privateusers = user;
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

  /* Creating a new user (Registration). Writing data to a database table. */
  createUser() {
    if (!this.privateusers.find(user => user.Email == this.data.Email) && !this.adminusers.find(user => user.Email == this.data.Email) && !this.legalusers.find(user => user.Email == this.data.Email)) {
      if (this.data.User == 'legaluser') {
        if (this.data.CountryID != 'none' && this.data.CompanyName && this.data.PhoneNumber && this.data.Email && this.data.Password) {
          this.legalUsersService.insertLegalUser(this.data).subscribe(() => { this.fetchData1(); });
        } else {
          alert("Input or select fields must not be empty!");
        }
      }
      if (this.data.User == 'privateuser') {
        if (this.data.CountryID != 'none' && this.data.Name && this.data.Surname && this.data.PhoneNumber && this.data.Email && this.data.Password) {
          this.privateUsersService.insertPrivateUser(this.data).subscribe(() => { this.fetchData1(); });
        } else {
          alert("Input or select fields must not be empty!");
        }
      }
      this.fetchData2();
      this.fetchData3();
      this.authService.setRegisteredUser(this.data);
      this.router.navigate(['/login']);
    } else {
      alert('User with this e-mail is already registered!');
    }
  }
}
