/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { CountryAudienceService } from 'src/app/services/country-audience.service';
import { PerformerServicesService } from 'src/app/services/performer-services.service';
import { CountriesService } from 'src/app/services/countries.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-country-audience',
  templateUrl: './admin-country-audience.component.html',
  styleUrls: ['./admin-country-audience.component.css']
})

/* Module view using class. */
export class AdminCountryAudienceComponent implements OnInit {

  countryaudience: any = [];
  performerservices: any = [];
  countries: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = "";

  /* Using services. */
  constructor(private countryAudienceService: CountryAudienceService, private performerServicesService: PerformerServicesService, private countriesService: CountriesService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
    this.data.ServiceID = 'none';
    this.data.CountryID = 'none';
  }

  /* Load data to variable using country audience service. Changing table fields data. */
  fetchData1() {
    this.fetchData2();
    this.fetchData3();
    this.countryAudienceService.getAllCountryAudience().subscribe(audience => {
      this.countryaudience = audience;
      for (var i = 0; i < this.countryaudience.length; i++) {
        for (var j = 0; j < this.countries.length; j++) {
          if (this.countryaudience[i].CountryID == this.countries[j].CountryID) {
            this.countryaudience[i].CountryID = this.countries[j].CountryName;
          }
        }
      }
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using performer services service. */
  fetchData2() {
    this.performerServicesService.getAllPerformerServices().subscribe(service => {
      this.performerservices = service;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using countries service. */
  fetchData3() {
    this.countriesService.getAllCountries().subscribe(country => {
      this.countries = country;
    },
      err => {
        console.log(err);
      });
  }

  /* Reset create form after button clicking. */
  resetCreateForm() {
    this.data = {};
    this.data.ServiceID = 'none';
    this.data.CountryID = 'none';
  }

  /* Reset update form after button clicking. */
  resetUpdateForm() {
    this.changingData = {};
  }

  /* Get a sum of audience percentage */
  audiencePercentageSum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += (+arr[i].AudiencePercentage);
    }
    return sum;
  }

  /* Create a new country audience using service. Writing data to a database table. */
  createCountryAudience() {
    if (this.data.AudiencePercentage && this.data.serviceID != 'none' && this.data.CountryID != 'none') {
      if (!this.countryaudience.find(audience => audience.ServiceID == this.data.ServiceID && audience.CountryID == this.countries.find(country => country.CountryID == this.data.CountryID).CountryName)) {
        var currentPercent = this.audiencePercentageSum(this.countryaudience.filter(audience => audience.ServiceID == this.data.ServiceID)) + (+this.data.AudiencePercentage);
        if (currentPercent > 100) {
          alert("Percent sum must not be bigger than 100%!");
        } else if (this.data.AudiencePercentage < 0) {
          alert("Audience percentage must be positive!");
        } else if (this.data.AudiencePercentage > 100) {
          alert("Audience percentage must not be less than 100%!");
        } else {
          this.countryAudienceService.insertCountryAudience(this.data).subscribe(() => { this.fetchData1() });
          for (var j = 0; j < this.countries.length; j++) {
            if (this.countries[j].CountryID == this.data.CountryID) {
              this.data.CountryID = this.countries[j].CountryName;
            }
          }
          this.countryaudience.push({
            ServiceID: this.data.ServiceID,
            CountryID: this.data.CountryID,
            AudiencePercentage: this.data.AudiencePercentage
          }
          );
          this.visibleForm = "";
        }
      } else {
        alert("Record with such data already exists!");
      }
    } else {
      alert("Input or select fields must not be empty!");
    }
  }

  /* Update country audience data using a service. */
  updateCountryAudience() {
    if (this.changingData.AudiencePercentage) {
      var currentPercent = this.audiencePercentageSum(this.countryaudience.filter(audience => audience.ServiceID == this.changingData.ServiceID && audience.CountryID != this.changingData.CountryName)) + (+this.changingData.AudiencePercentage);
      // similar working code for audiencePercentageSum() function: this.countryaudience.filter(audience => audience.ServiceID == this.changingData.ServiceID).filter(audience => audience.CountryID != this.changingData.CountryName)
      if (currentPercent > 100) {
        alert("Percent sum must not be bigger than 100%!"); this.visibleForm = "";
      } else if (this.changingData.AudiencePercentage < 0) {
        alert("Audience percentage must be positive!"); this.visibleForm = "";
      } else if (this.changingData.AudiencePercentage > 100) {
        alert("Audience percentage must not be less than 100%!"); this.visibleForm = "";
      } else {
        this.countryAudienceService.updateCountryAudience(this.changingData).subscribe(() => { this.fetchData1(); });
        for (var i = 0; i < this.countryaudience.length; i++) {
          if (this.changingData.ServiceID == this.countryaudience[i].ServiceID && this.changingData.CountryID == this.getCountryIdByName(this.countryaudience[i].CountryID)) {
            this.countryaudience[i].AudiencePercentage = this.changingData.AudiencePercentage;
          }
        }
        this.visibleForm = "";
      }
    } else {
      alert("Input field <<Audience Percentage>> must not be empty!"); this.visibleForm = "";
    }
  }

  /* Get data from form for updating country audience data. */
  getCountryAudienceForUpdate(id1, id2) {
    this.countryAudienceService.getCountryAudienceByServiceID(id1, this.getCountryIdByName(id2)).subscribe(audience => {
      this.changingData.ServiceID = audience[0].ServiceID;
      this.changingData.CountryID = audience[0].CountryID;
      this.changingData.CountryName = id2;
      this.changingData.AudiencePercentage = audience[0].AudiencePercentage;
    },
      err => {
        console.log(err);
      });
  }

  /* Get country id by country name. */
  getCountryIdByName(countryname) {
    for (var i = 0; i < this.countries.length; i++) {
      if (this.countries[i].CountryName == countryname) {
        return this.countries[i].CountryID;
      }
    }
  }

  /* Remove selected country audience from database table. */
  deleteCountryAudience(serviceID, countryID, audiencePercentage) {
    this.countryAudienceService.deleteCountryAudience(serviceID, this.getCountryIdByName(countryID)).subscribe(() => { this.fetchData1(); });
    this.countryaudience = this.countryaudience.filter(audience => {
      var obj = { "ServiceID": serviceID, "CountryID": countryID, "AudiencePercentage": audiencePercentage };
      return JSON.stringify(audience) != JSON.stringify(obj);
    });
  }
}
