/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { UserTypesService } from 'src/app/services/user-types.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-user-types',
  templateUrl: './admin-user-types.component.html',
  styleUrls: ['./admin-user-types.component.css']
})

/* Module view using class. */
export class AdminUserTypesComponent implements OnInit {

  usertypes: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = "";

  /* Using service. */
  constructor(private userTypesService: UserTypesService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
  }

  /* Load data to variable using user types service. */
  fetchData1() {
    this.userTypesService.getAllUserTypes().subscribe(usertypes => {
      this.usertypes = usertypes;
    },
      err => {
        console.log(err);
      });
  }

  /* Reset create form after button clicking. */
  resetCreateForm() {
    this.data = {};
  }

  /* Reset update form after button clicking. */
  resetUpdateForm() {
    this.changingData = {};
  }

  /* Create a new user type using service. Writing data to a database table. */
  createUserType() {
    if (this.data.TypeName) {
      if (!this.usertypes.find(type => type.TypeName == this.data.TypeName)) {
        this.userTypesService.insertUserType(this.data).subscribe(() => { this.fetchData1(); });
        this.usertypes.push({
          TypeID: this.usertypes[this.usertypes.length - 1].TypeID + 1,
          TypeName: this.data.TypeName
        }
        );
        this.visibleForm = "";
      } else {
        alert("User type with this name exists!");
      }
    } else {
      alert("Input field must not be empty!"); this.visibleForm = "";
    }
  }

  /* Update user type data using a service. */
  updateUserType() {
    if (this.changingData.TypeName) {
      if (!this.usertypes.find(type => type.TypeName == this.changingData.TypeName && type.TypeID != this.changingData.TypeID)) {
        this.userTypesService.updateUserType(this.changingData).subscribe(() => { this.fetchData1(); });
        for (var i = 0; i < this.usertypes.length; i++) {
          if (this.changingData.TypeID == this.usertypes[i].TypeID) {
            this.usertypes[i].TypeName = this.changingData.TypeName;
          }
        }
        this.visibleForm = "";
      } else {
        alert("User type with this name exists!"); this.visibleForm = "";
      }
    } else {
      alert("Input field must not be empty!"); this.visibleForm = "";
    }
  }

  /* Get data from form for updating user's type data. */
  getUserTypeForUpdate(id) {
    this.userTypesService.getUserTypeByID(id).subscribe(usertype => {
      this.changingData.TypeID = usertype[0].TypeID;
      this.changingData.TypeName = usertype[0].TypeName;
    },
      err => {
        console.log(err);
      });
  }

  /* Remove selected user type from database table. */
  deleteUserType(id) {
    this.userTypesService.deleteUserType(id).subscribe(() => { this.fetchData1(); });
    this.usertypes = this.usertypes.filter(usertype => usertype.TypeID != id);
  }
}
