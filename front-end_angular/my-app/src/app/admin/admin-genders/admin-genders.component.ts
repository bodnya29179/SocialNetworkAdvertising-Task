/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { GendersService } from 'src/app/services/genders.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-genders',
  templateUrl: './admin-genders.component.html',
  styleUrls: ['./admin-genders.component.css']
})

/* Module view using class. */
export class AdminGendersComponent implements OnInit {

  genders: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = "";

  /* Using service. */
  constructor(private gendersService: GendersService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
  }

  /* Load data to variable using genders service. */
  fetchData1() {
    this.gendersService.getAllGenders().subscribe(genders => {
      this.genders = genders;
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

  /* Create a new gender using service. Writing data to a database table. */
  createGender() {
    if (this.data.GenderName) {
      if (!this.genders.find(gender => gender.GenderName == this.data.GenderName)) {
        this.gendersService.insertGender(this.data).subscribe(() => { this.fetchData1(); });
        this.genders.push({
          GenderID: this.genders[this.genders.length - 1].GenderID + 1,
          GenderName: this.data.GenderName
        }
        );
        this.visibleForm = "";
      } else {
        alert("Gender with this name exists!");
      }
    }
  }

  /* Update gender data using a service. */
  updateGender() {
    if (this.changingData.GenderName) {
      if (!this.genders.find(gender => gender.GenderName == this.changingData.GenderName && gender.GenderID != this.changingData.GenderID)) {
        this.gendersService.updateGender(this.changingData).subscribe(() => { this.fetchData1(); });
        for (var i = 0; i < this.genders.length; i++) {
          if (this.changingData.GenderID == this.genders[i].GenderID) {
            this.genders[i].GenderName = this.changingData.GenderName;
          }
        }
        this.visibleForm = "";
      } else {
        alert("Gender with this name exists!"); this.visibleForm = "";
      }
    } else {
      alert("Input field must not be empty!"); this.visibleForm = "";
    }
  }

  /* Get data from form for updating gender data. */
  getGenderForUpdate(id) {
    this.gendersService.getGenderByID(id).subscribe(gender => {
      this.changingData.GenderID = gender[0].GenderID;
      this.changingData.GenderName = gender[0].GenderName;
    },
      err => {
        console.log(err);
      });
  }

  /* Remove selected gender from database table. */
  deleteGender(id) {
    this.gendersService.deleteGender(id).subscribe(() => { this.fetchData1(); });
    this.genders = this.genders.filter(gender => gender.GenderID != id);
  }
}
