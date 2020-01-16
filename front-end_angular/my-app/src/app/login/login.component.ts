/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { LegalUsersService } from '../services/legal-users.service';
import { PrivateUsersService } from '../services/private-users.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AdminUsersService } from '../services/admin-users.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/* Module view using class. */
export class LoginComponent implements OnInit {

  data: any = {};
  adminusers: any = [];
  privateusers: any = [];
  legalusers: any = [];

  /* Using services. */
  constructor(private adminUsersService: AdminUsersService, private legalUsersService: LegalUsersService, private privateUsersService: PrivateUsersService, private router: Router, private authService: AuthService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
    this.data.Email = "johnes@gmail.com";
    this.data.Password = "willpassword33";
  }

  /* Load data to variable using private users service. */
  fetchData1() {
    this.fetchData2();
    this.fetchData3();
    this.privateUsersService.getAllPrivateUsers().subscribe(users => {
      this.privateusers = users;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using legal users service. */
  fetchData2() {
    this.legalUsersService.getAllLegalUsers().subscribe(users => {
      this.legalusers = users;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using admin users service. */
  fetchData3() {
    this.adminUsersService.getAllAdminUsers().subscribe(users => {
      this.adminusers = users;
    },
      err => {
        console.log(err);
      });
  }

  /* Get user type by email adress and password. */
  getUserByEmailPassword(arr, email, password) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].Email == email && arr[i].Password == password) {
        ;
        this.authService.setLoggedInUser(arr[i]);
        return arr[i].TypeID;
      }
    }
    return false;
  }

  /* Login user to the system. */
  loginUser() {
    var obj = this.authService.getRegisteredUser();
    if (!(Object.entries(obj).length === 0 && obj.constructor === Object)) {
      if (obj.User == 'legaluser') this.legalusers.push(obj);
      if (obj.User == 'privateuser') this.privateusers.push(obj);
    }
    if (this.getUserByEmailPassword(this.adminusers, this.data.Email, this.data.Password) == 1) {
      this.router.navigate(['/admin/adminusers']);
    } else if (this.getUserByEmailPassword(this.legalusers, this.data.Email, this.data.Password) == 2 || this.getUserByEmailPassword(this.privateusers, this.data.Email, this.data.Password) == 2) {
      this.router.navigate(['/customer/services']);
    } else if (this.getUserByEmailPassword(this.legalusers, this.data.Email, this.data.Password) == 3 || this.getUserByEmailPassword(this.privateusers, this.data.Email, this.data.Password) == 3) {
      this.router.navigate(['/performer/services']);
    } else {
      alert("This user is not exist!");
    }
  }
}
