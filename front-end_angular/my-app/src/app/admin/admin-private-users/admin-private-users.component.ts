/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { PrivateUsersService } from 'src/app/services/private-users.service';
import { CountriesService } from 'src/app/services/countries.service';
import { UserTypesService } from 'src/app/services/user-types.service';
import { LegalUsersService } from 'src/app/services/legal-users.service';
import { AdminUsersService } from 'src/app/services/admin-users.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-private-users',
  templateUrl: './admin-private-users.component.html',
  styleUrls: ['./admin-private-users.component.css']
})

/* Module view using class. */
export class AdminPrivateUsersComponent implements OnInit {

  privateusers: any = [];
  legalusers: any = [];
  adminusers: any = [];
  countries: any = [];
  usertypes: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = "";

  /* Using services. */
  constructor(private privateUsersService: PrivateUsersService, private countriesService: CountriesService, private userTypesService: UserTypesService, private legalUsersService: LegalUsersService, private adminUsersService: AdminUsersService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
    this.data.CountryID = 'none';
    this.data.TypeID = 'none';
  }

  /* Load data to variable using private users service. Changing table fields data. */
  fetchData1() {
    this.fetchData2();
    this.fetchData3();
    this.fetchData4();
    this.fetchData5();
    this.privateUsersService.getAllPrivateUsers().subscribe(user => {
      this.privateusers = user;
      for (var i = 0; i < this.privateusers.length; i++) {
        for (var j = 0; j < this.countries.length; j++) {
          if (this.privateusers[i].CountryID == this.countries[j].CountryID) {
            this.privateusers[i].CountryID = this.countries[j].CountryName;
          }
        }
      }
      for (var i = 0; i < this.privateusers.length; i++) {
        for (var j = 0; j < this.usertypes.length; j++) {
          if (this.privateusers[i].TypeID == this.usertypes[j].TypeID) {
            this.privateusers[i].TypeID = this.usertypes[j].TypeName;
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
      this.usertypes = types.filter(type => { return type.TypeName != 'admin'; });;
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

  /* Load data to variable using legal users service. */
  fetchData5() {
    this.legalUsersService.getAllLegalUsers().subscribe(user => {
      this.legalusers = user;
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

  /* Create a new private user using service. Writing data to a database table. */
  createPrivateUser() {
    if (this.data.Name && this.data.Surname && this.data.CountryID != 'none' && this.data.PhoneNumber && this.data.Email && this.data.Password && this.data.TypeID != 'none') {
      if (!this.privateusers.find(user => user.Email == this.data.Email) && !this.adminusers.find(user => user.Email == this.data.Email) && !this.legalusers.find(user => user.Email == this.data.Email)) {
        this.privateUsersService.insertPrivateUser(this.data).subscribe(() => { this.fetchData1(); });
        this.privateusers.push({
          UserID: this.privateusers[this.privateusers.length - 1].UserID + 1,
          Name: this.data.Name,
          Surname: this.data.Surname,
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
      alert('Please, fill in all fields!');
    }
  }

  /* Update private user data using a service. */
  updatePrivateUser() {
    if (this.changingData.Name && this.changingData.Surname && this.changingData.CountryID != 'none' && this.changingData.PhoneNumber && this.changingData.Email && this.changingData.Password && this.changingData.TypeID != 'none') {
      if (!this.privateusers.find(user => user.Email == this.changingData.Email && user.UserID != this.changingData.UserID) && !this.adminusers.find(user => user.Email == this.changingData.Email) && !this.legalusers.find(user => user.Email == this.changingData.Email)) {
        this.privateUsersService.updatePrivateUser(this.changingData).subscribe(() => { this.fetchData1(); });
        for (var i = 0; i < this.privateusers.length; i++) {
          if (this.changingData.UserID == this.privateusers[i].UserID) {
            this.privateusers[i].Name = this.changingData.Name;
            this.privateusers[i].Surname = this.changingData.Surname;
            this.privateusers[i].CountryID = this.getCountryNameById(this.changingData.CountryID);
            this.privateusers[i].PhoneNumber = this.changingData.PhoneNumber;
            this.privateusers[i].Email = this.changingData.Email;
            this.privateusers[i].Password = this.changingData.Password;
            this.privateusers[i].TypeID = this.getTypeNameById(this.changingData.TypeID);
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

  /* Get data from form for updating private user data. */
  getPrivateUserForUpdate(id) {
    this.privateUsersService.getPrivateUserByID(id).subscribe(user => {
      this.changingData.UserID = user[0].UserID;
      this.changingData.Name = user[0].Name;
      this.changingData.Surname = user[0].Surname;
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

  /* Remove selected private user from database table. */
  deletePrivateUser(id) {
    this.privateUsersService.deletePrivateUser(id).subscribe(() => { this.fetchData1(); });
    this.privateusers = this.privateusers.filter(user => user.UserID != id);
  }
}
