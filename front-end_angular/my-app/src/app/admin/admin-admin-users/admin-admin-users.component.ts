/* Import all modules, libraries and services. */
import { Component, OnInit } from '@angular/core';
import { AdminUsersService } from 'src/app/services/admin-users.service';
import { CountriesService } from 'src/app/services/countries.service';
import { LegalUsersService } from 'src/app/services/legal-users.service';
import { PrivateUsersService } from 'src/app/services/private-users.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-admin-users',
  templateUrl: './admin-admin-users.component.html',
  styleUrls: ['./admin-admin-users.component.css']
})

/* Module view using class. */
export class AdminAdminUsersComponent implements OnInit {

  adminusers: any = [];
  countries: any = [];
  legalusers: any = [];
  privateusers: any = [];
  changingData: any = {};
  visibleForm: string = "";

  /* Using services. */
  constructor(private adminUsersService: AdminUsersService, private countriesService: CountriesService, private legalUsersService: LegalUsersService, private privateUsersService: PrivateUsersService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
  }

  /* Load data to variable using admin users service. Changing table fields using fetch data. */
  fetchData1() {
    this.fetchData2();
    this.fetchData3();
    this.fetchData4();
    this.adminUsersService.getAllAdminUsers().subscribe(user => {
      this.adminusers = user;
      for (var i = 0; i < this.adminusers.length; i++) {
        for (var j = 0; j < this.countries.length; j++) {
          if (this.adminusers[i].CountryID == this.countries[j].CountryID) {
            this.adminusers[i].CountryID = this.countries[j].CountryName;
          }
        }
      }
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using countries service. */
  fetchData2() {
    this.countriesService.getAllCountries().subscribe(country => {
      this.countries = country;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using legal users service. */
  fetchData3() {
    this.legalUsersService.getAllLegalUsers().subscribe(user => {
      this.legalusers = user;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using private users service. */
  fetchData4() {
    this.privateUsersService.getAllPrivateUsers().subscribe(user => {
      this.privateusers = user;
    },
      err => {
        console.log(err);
      });
  }

  /* Reset update form after button clicking. */
  resetUpdateForm() {
    this.changingData = {};
  }

  /* Update admin user data using a service. */
  updateAdminUser() {
    if (this.changingData.CountryID != 'none' && this.changingData.PhoneNumber && this.changingData.Email && this.changingData.Password) {
      if (!this.privateusers.find(user => user.Email == this.changingData.Email) && !this.legalusers.find(user => user.Email == this.changingData.Email)) {
        this.adminUsersService.updateAdminUser(this.changingData).subscribe(() => { this.fetchData1(); });
        for (var i = 0; i < this.adminusers.length; i++) {
          if (this.changingData.UserID == this.adminusers[i].UserID) {
            this.adminusers[i].CountryID = this.getCountryNameById(this.changingData.CountryID);
            this.adminusers[i].PhoneNumber = this.changingData.PhoneNumber;
            this.adminusers[i].Email = this.changingData.Email;
            this.adminusers[i].Password = this.changingData.Password;
          }
        }
        this.visibleForm = "";
      } else {
        alert("User with this email exists!"); this.visibleForm = "";
      }
    } else {
      alert("Input or select fields must not be empty!"); this.visibleForm = "";
    }
  }

  /* Get country name by id. */
  getCountryNameById(id) {
    for (var j = 0; j < this.countries.length; j++) {
      if (this.countries[j].CountryID == id) {
        return this.countries[j].CountryName;
      }
    }
  }

  /* Get data from form for updating user's data. */
  getAdminUserForUpdate(id) {
    this.adminUsersService.getAdminUserByID(id).subscribe(user => {
      this.changingData.UserID = user[0].UserID;
      this.changingData.CountryID = user[0].CountryID;
      this.changingData.PhoneNumber = user[0].PhoneNumber;
      this.changingData.Email = user[0].Email;
      this.changingData.Password = user[0].Password;
    },
      err => {
        console.log(err);
      });
  }
}
