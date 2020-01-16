/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PerformerServicesService } from 'src/app/services/performer-services.service';
import { CountriesService } from 'src/app/services/countries.service';
import { SocialNetworksService } from 'src/app/services/social-networks.service';
import { CountryAudienceService } from 'src/app/services/country-audience.service';
import { GenderAudienceService } from 'src/app/services/gender-audience.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-performer-services',
  templateUrl: './performer-services.component.html',
  styleUrls: ['./performer-services.component.css']
})

/* Module view using class. */
export class PerformerServicesComponent implements OnInit {

  countries: any = [];
  socialnetworks: any = [];
  performerservices: any = [];
  performerservicesforcountry: any = [];
  performerservicesforgender: any = [];
  visibleForm: string = "";
  data: any = {};
  count: number = 1;

  /* Using services. */
  constructor(private authService: AuthService, private performerServicesService: PerformerServicesService, private countriesService: CountriesService, private socialNetworksService: SocialNetworksService, private countryAudienceService: CountryAudienceService, private genderAudienceService: GenderAudienceService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
    this.fetchData2();
    this.fetchData3();
    this.fetchData4();
    this.data.SocialNetworkID = 'none';
    this.data.CountryID1 = 'none';
    this.data.CountryID2 = 'none';
    this.data.CountryID3 = 'none';
    this.data.CountryID4 = 'none';
    this.data.CountryID5 = 'none';
  }

  /* Load data to variable using performer services service including country audience. Changing table fields data. */
  fetchData() {
    this.fetchData1();
    this.performerServicesService.getFullInfoCountryAudience().subscribe(service => {
      this.performerservicesforcountry = service.filter(service => service.UserID == (this.authService.getLoggedInUser()).UserID);
      for (var i = 0; i < this.performerservicesforcountry.length; i++) {
        for (var j = 0; j < this.performerservicesforgender.length; j++) {
          if (this.performerservicesforcountry[i].ServiceID == this.performerservicesforgender[j].ServiceID) {
            this.performerservicesforcountry[i].GenderAudience = this.performerservicesforgender[j].GenderAudience;
          }
        }
      }
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using performer services including gender audience service. */
  fetchData1() {
    this.performerServicesService.getFullInfoGenderAudience().subscribe(service => {
      this.performerservicesforgender = service;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using social networks service. */
  fetchData2() {
    this.socialNetworksService.getAllSocialNetworks().subscribe(network => {
      this.socialnetworks = network;
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

  /* Load data to variable using performer services service. */
  fetchData4() {
    this.performerServicesService.getAllPerformerServices().subscribe(service => {
      this.performerservices = service;
    },
      err => {
        console.log(err);
      });
  }

  /* Reset create form after button clicking. */
  resetCreateForm() {
    this.data = {};
    this.data.CountryID = 'none';
    this.data.SocialNetworkID = 'none';
  }

  /* Add country audience field to create form after button clicking. */
  addCountry() {
    if (this.count < 5) this.count++;
  }

  /* Delete country audience field from create form after button clicking. */
  deleteCountry() {
    if (this.count > 1) this.count--;
  }

  /* Create a new performer service. Writing data to a database table. */
  createPerformerService() {
    if (this.data.SocialNetworkID && this.data.ProfileID && this.data.Subscribers && this.data.ManAudience && this.data.WomanAudience && this.data.CountryID1 && this.data.CountryAudience1 && this.data.Price) {
      var country_audience = "";
      var gender_audience = "";
      var gender_sum = 0;
      var country_sum = 0;
      if (this.data.ManAudience) {
        if (this.data.ManAudience < 0) return alert("Man audience percentage should be positive!");
        gender_audience += "man - " + this.data.ManAudience + "% "; gender_sum += this.data.ManAudience;
      }
      if (this.data.WomanAudience) {
        if (this.data.WomanAudience < 0) return alert("Woman audience percentage should be positive!");
        gender_audience += "woman - " + this.data.WomanAudience + "%"; gender_sum += this.data.WomanAudience;
      }
      if (gender_sum > 100) {
        return alert("Gender percent sum should not be bigger 100%!");
      }
      if (this.data.CountryID1 != 'none' && this.data.CountryAudience1) {
        if (this.data.CountryAudience1 < 0) return alert("Country audience percentage should be positive!");
        country_audience += (this.countries.find(country => country.CountryID == this.data.CountryID1)).CountryName + " - " + this.data.CountryAudience1 + "%, "; country_sum += this.data.CountryAudience1;
      } else {
        this.data.CountryID1 = 0; this.data.CountryAudience1 = 0;
      }
      if (this.data.CountryID2 != 'none' && this.data.CountryAudience2) {
        if (this.data.CountryAudience2 < 0) return alert("Country audience percentage should be positive!");
        country_audience += (this.countries.find(country => country.CountryID == this.data.CountryID2)).CountryName + " - " + this.data.CountryAudience2 + "%, "; country_sum += this.data.CountryAudience2;
      } else {
        this.data.CountryID2 = 0; this.data.CountryAudience2 = 0;
      }
      if (this.data.CountryID3 != 'none' && this.data.CountryAudience3) {
        if (this.data.CountryAudience3 < 0) return alert("Country audience percentage should be positive!");
        country_audience += (this.countries.find(country => country.CountryID == this.data.CountryID3)).CountryName + " - " + this.data.CountryAudience3 + "%, "; country_sum += this.data.CountryAudience3;
      } else {
        this.data.CountryID3 = 0; this.data.CountryAudience3 = 0;
      }
      if (this.data.CountryID4 != 'none' && this.data.CountryAudience4) {
        if (this.data.CountryAudience4 < 0) return alert("Country audience percentage should be positive!");
        country_audience += (this.countries.find(country => country.CountryID == this.data.CountryID4)).CountryName + " - " + this.data.CountryAudience4 + "%, "; country_sum += this.data.CountryAudience4;
      } else {
        this.data.CountryID4 = 0; this.data.CountryAudience4 = 0;
      }
      if (this.data.CountryID5 != 'none' && this.data.CountryAudience5) {
        if (this.data.CountryAudience5 < 0) return alert("Country audience percentage should be positive!");
        country_audience += (this.countries.find(country => country.CountryID == this.data.CountryID5)).CountryName + " - " + this.data.CountryAudience5 + "%, "; country_sum += this.data.CountryAudience5;
      } else {
        this.data.CountryID5 = 0; this.data.CountryAudience5 = 0;
      }
      if (country_sum > 100) {
        return alert("Country percent sum should not be bigger 100%!");
      }
      this.performerServicesService.insertPerformerServiceFullInfo({
        UserID: (this.authService.getLoggedInUser()).UserID,
        SocialNetworkID: this.data.SocialNetworkID,
        ProfileID: this.data.ProfileID,
        Subscribers: this.data.Subscribers,
        Price: this.data.Price,
        GenderID1: 1,
        ManAudience: this.data.ManAudience,
        GenderID2: 2,
        WomanAudience: this.data.WomanAudience,
        CountryID1: this.data.CountryID1,
        CountryAudience1: this.data.CountryAudience1,
        CountryID2: this.data.CountryID2,
        CountryAudience2: this.data.CountryAudience2,
        CountryID3: this.data.CountryID3,
        CountryAudience3: this.data.CountryAudience3,
        CountryID4: this.data.CountryID4,
        CountryAudience4: this.data.CountryAudience4,
        CountryID5: this.data.CountryID5,
        CountryAudience5: this.data.CountryAudience5,
      }).subscribe(() => { this.fetchData(); });
      var service_id = Math.max.apply(Math, this.performerservices.map(function (o) { return o.ServiceID + 1; }));///////////////////
      this.performerservicesforcountry.push({
        ServiceID: service_id,
        NetworkName: (this.socialnetworks.find(network => network.SocialNetworkID == this.data.SocialNetworkID)).NetworkName,
        ProfileID: this.data.ProfileID,
        Subscribers: this.data.Subscribers,
        CountryAudience: country_audience.slice(0, -1),
        GenderAudience: gender_audience,
        Price: this.data.Price
      });
      this.visibleForm = "";
      this.resetCreateForm();
    } else {
      alert("Select and input fields must not be empty!");
    }
  }

  /* Remove selected performer service from database table. */
  deletePerformerService(id) {
    this.performerServicesService.deletePerformerService(id).subscribe(() => { this.fetchData() });
    this.performerservicesforcountry = this.performerservicesforcountry.filter(service => service.ServiceID != id);
  }
}
