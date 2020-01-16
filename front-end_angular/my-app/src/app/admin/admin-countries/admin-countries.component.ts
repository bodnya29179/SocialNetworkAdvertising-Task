/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-countries',
  templateUrl: './admin-countries.component.html',
  styleUrls: ['./admin-countries.component.css']
})

/* Module view using class. */
export class AdminCountriesComponent implements OnInit {

  countries: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = "";

  /* Using service. */
  constructor(private countriesService: CountriesService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
  }

  /* Load data to variable using countries service. */
  fetchData1() {
    this.countriesService.getAllCountries().subscribe(countries => {
      this.countries = countries;
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

  /* Create a new country using service. Writing data to a database table. */
  createCountry() {
    if (this.data.CountryName) {
      if (!this.countries.find(country => country.CountryName == this.data.CountryName)) {
        this.countriesService.insertCountry(this.data).subscribe(() => { this.fetchData1(); });
        this.countries.push({
          CountryID: this.countries[this.countries.length - 1].CountryID + 1,
          CountryName: this.data.CountryName
        }
        );
        this.visibleForm = "";
      } else {
        alert("Country with this name exists!");
      }
    } else {
      alert("Input field must not be empty");
    }
  }

  /* Update country data using a service. */
  updateCountry() {
    if (this.changingData.CountryName) {
      if (!this.countries.find(country => country.CountryName == this.changingData.CountryName && country.CountryID != this.changingData.CountryID)) {
        this.countriesService.updateCountry(this.changingData).subscribe(() => { this.fetchData1(); });
        for (var i = 0; i < this.countries.length; i++) {
          if (this.changingData.CountryID == this.countries[i].CountryID) {
            this.countries[i].CountryName = this.changingData.CountryName;
          }
        }
        this.visibleForm = "";
      } else {
        alert("Country with this name exists!"); this.visibleForm = "";
      }
    } else {
      alert("Input field must not be empty!"); this.visibleForm = "";
    }
  }

  /* Get data from form for updating country data. */
  getCountryForUpdate(id) {
    this.countriesService.getCountryByID(id).subscribe(country => {
      this.changingData.CountryID = country[0].CountryID;
      this.changingData.CountryName = country[0].CountryName;
    },
      err => {
        console.log(err);
      });
  }

  /* Remove selected country from database table. */
  deleteCountry(id) {
    this.countriesService.deleteCountry(id).subscribe(() => { this.fetchData1(); });
    this.countries = this.countries.filter(country => country.CountryID != id);
  }
}
