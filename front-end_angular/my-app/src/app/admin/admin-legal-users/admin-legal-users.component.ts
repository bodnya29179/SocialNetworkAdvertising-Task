/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { LegalUsersService } from 'src/app/services/legal-users.service';
import { CountriesService } from 'src/app/services/countries.service';
import { UserTypesService } from 'src/app/services/user-types.service';
import { PrivateUsersService } from 'src/app/services/private-users.service';
import { AdminUsersService } from 'src/app/services/admin-users.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-legal-users',
  templateUrl: './admin-legal-users.component.html',
  styleUrls: ['./admin-legal-users.component.css']
})

/* Module view using class. */
export class AdminLegalUsersComponent implements OnInit {

  legalusers: any = [];
  privateusers: any = [];
  adminusers: any = [];
  countries: any = [];
  usertypes: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = "";

  /* Using services. */
  constructor(private legalUsersService: LegalUsersService, private countriesService: CountriesService, private userTypesService: UserTypesService, private adminUsersService: AdminUsersService, private privateUsersService: PrivateUsersService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
    this.data.CountryID = 'none';
    this.data.TypeID = 'none';
  }

  /* Load data to variable using legal users service. Changing table fields data. */
  fetchData1() {
    this.fetchData2();
    this.fetchData3();
    this.fetchData4();
    this.fetchData5();
    this.legalUsersService.getAllLegalUsers().subscribe(user => {
      this.legalusers = user;
      for (var i = 0; i < this.legalusers.length; i++) {
        for (var j = 0; j < this.countries.length; j++) {
          if (this.legalusers[i].CountryID == this.countries[j].CountryID) {
            this.legalusers[i].CountryID = this.countries[j].CountryName;
          }
        }
      }
      for (var i = 0; i < this.legalusers.length; i++) {
        for (var j = 0; j < this.usertypes.length; j++) {
          if (this.legalusers[i].TypeID == this.usertypes[j].TypeID) {
            this.legalusers[i].TypeID = this.usertypes[j].TypeName;
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

  /* Load data to variable using user types service. */
  fetchData3() {
    this.userTypesService.getAllUserTypes().subscribe(types => {
      this.usertypes = types.filter(type => { return type.TypeName != 'admin'; });
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

  /* Load data to variable using private users service. */
  fetchData5() {
    this.privateUsersService.getAllPrivateUsers().subscribe(user => {
      this.privateusers = user;
    },
      err => {
        console.log(err);
      });
  }

  /* Reset create form after button clicking. */
  resetCreateForm() {
    this.data = {};
    this.data.CountryID = 'none';
    this.data.TypeID = 'none';
  }

  /* Reset update form after button clicking. */
  resetUpdateForm() {
    this.changingData = {};
  }

  /* Create a new legal user using service. Writing data to a database table. */
  createLegalUser() {
    if (this.data.CompanyName && this.data.CountryID != 'none' && this.data.PhoneNumber && this.data.Email && this.data.Password && this.data.TypeID != 'none') {
      if (!this.privateusers.find(user => user.Email == this.data.Email) && !this.adminusers.find(user => user.Email == this.data.Email) && !this.legalusers.find(user => user.Email == this.data.Email)) {
        this.legalUsersService.insertLegalUser(this.data).subscribe(() => { this.fetchData1(); });
        this.legalusers.push({
          UserID: this.legalusers[this.legalusers.length - 1].UserID + 1,
          CompanyName: this.data.CompanyName,
          CountryID: this.getCountryNameById(this.data.CountryID),
          PhoneNumber: this.data.PhoneNumber,
          Email: this.data.Email,
          Password: this.data.Password,
          TypeID: this.getTypeNameById(this.data.TypeID)
        }
        );
        this.visibleForm = "";
      } else {
        alert("User with this email exists!");
      }
    } else {
      alert("Input or select fields must not be empty!");
    }
  }

  /* Update legal user data using a service. */
  updateLegalUser() {
    if (this.changingData.CompanyName && this.changingData.CountryID != 'none' && this.changingData.PhoneNumber && this.changingData.Email && this.changingData.Password && this.changingData.TypeID != 'none') {
      if (!this.privateusers.find(user => user.Email == this.changingData.Email) && !this.adminusers.find(user => user.Email == this.changingData.Email) && !this.legalusers.find(user => user.Email == this.changingData.Email && user.UserID != this.changingData.UserID)) {
        this.legalUsersService.updateLegalUser(this.changingData).subscribe(() => { this.fetchData1(); });
        for (var i = 0; i < this.legalusers.length; i++) {
          if (this.changingData.UserID == this.legalusers[i].UserID) {
            this.legalusers[i].CompanyName = this.changingData.CompanyName;
            this.legalusers[i].CountryID = this.getCountryNameById(this.changingData.CountryID);
            this.legalusers[i].PhoneNumber = this.changingData.PhoneNumber;
            this.legalusers[i].Email = this.changingData.Email;
            this.legalusers[i].Password = this.changingData.Password;
            this.legalusers[i].TypeID = this.getTypeNameById(this.changingData.TypeID);
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

  /* Get country name by country id. */
  getCountryNameById(id) {
    for (var j = 0; j < this.countries.length; j++) {
      if (this.countries[j].CountryID == id) {
        return this.countries[j].CountryName;
      }
    }
  }

  /* Get type name by type id. */
  getTypeNameById(id) {
    for (var j = 0; j < this.usertypes.length; j++) {
      if (this.usertypes[j].TypeID == id) {
        return this.usertypes[j].TypeName;
      }
    }
  }

  /* Get data from form for updating legal user data. */
  getLegalUserForUpdate(id) {
    this.legalUsersService.getLegalUserByID(id).subscribe(user => {
      this.changingData.UserID = user[0].UserID;
      this.changingData.CompanyName = user[0].CompanyName;
      this.changingData.CountryID = user[0].CountryID;
      this.changingData.PhoneNumber = user[0].PhoneNumber;
      this.changingData.Email = user[0].Email;
      this.changingData.Password = user[0].Password;
      this.changingData.TypeID = user[0].TypeID;
    },
      err => {
        console.log(err);
      });
  }

  /* Remove selected legal user from database table. */
  deleteLegalUser(id) {
    this.legalUsersService.deleteLegalUser(id).subscribe(() => { this.fetchData1(); });
    this.legalusers = this.legalusers.filter(user => user.UserID != id);
  }
}
