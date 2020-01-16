/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { SocialNetworksService } from 'src/app/services/social-networks.service';
import { GendersService } from 'src/app/services/genders.service';
import { PerformerServicesService } from 'src/app/services/performer-services.service';
import { PrivateUsersService } from 'src/app/services/private-users.service';
import { LegalUsersService } from 'src/app/services/legal-users.service';
import { CountryAudienceService } from 'src/app/services/country-audience.service';
import { GenderAudienceService } from 'src/app/services/gender-audience.service';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthService } from 'src/app/services/auth.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-customer-services',
  templateUrl: './customer-services.component.html',
  styleUrls: ['./customer-services.component.css']
})

/* Module view using class. */
export class CustomerServicesComponent implements OnInit {

  countries: any = [];
  socialnetworks: any = [];
  genders: any = [];
  performerservicesforcountry: any = [];
  performerservicesforgender: any = [];
  privateusers: any = [];
  legalusers: any = [];
  countryaudience: any = [];
  genderaudience: any = [];
  orders: any = [];
  subscribersto: number;
  subscribersfrom: number;
  subscriberstomax: number;
  subscribersfrommin: number;
  priceto: number;
  pricefrom: number;
  pricetomax: number;
  pricefrommin: number;
  sortingType: string;

  /* Using services. */
  constructor(private authService: AuthService, private performerServicesService: PerformerServicesService, private countriesService: CountriesService, private socialNetworksService: SocialNetworksService, private gendersService: GendersService, private privateUsersService: PrivateUsersService, private legalUsersService: LegalUsersService, private countryAudienceService: CountryAudienceService, private genderAudienceService: GenderAudienceService, private orderService: OrdersService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
    this.fetchData1();
    this.fetchData2();
    this.fetchData3();
    this.fetchData4();
    this.fetchData5();
    this.fetchData9();
    this.sortingType = "0";
  }

  /* Load data to variable using performer services service. Changing table fields data. Getting min and max price and subscribers vulues. */
  fetchData() {
    this.fetchData8();
    this.performerServicesService.getFullInfoCountryAudience().subscribe(service => {
      this.performerservicesforcountry = service;
      this.pricetomax = this.priceto = Math.max.apply(Math, this.performerservicesforcountry.map(function (o) { return o.Price; }));
      this.pricefrommin = this.pricefrom = Math.min.apply(Math, this.performerservicesforcountry.map(function (o) { return o.Price; }));
      this.subscriberstomax = this.subscribersto = Math.max.apply(Math, this.performerservicesforcountry.map(function (o) { return o.Subscribers; }));
      this.subscribersfrommin = this.subscribersfrom = Math.min.apply(Math, this.performerservicesforcountry.map(function (o) { return o.Subscribers; }));
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

  /* Load data to variable using countries service. */
  fetchData1() {
    this.countriesService.getAllCountries().subscribe(country => {
      this.countries = country; this.countries.filter(country => country.checked = true);
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using social networks service. */
  fetchData2() {
    this.socialNetworksService.getAllSocialNetworks().subscribe(network => {
      this.socialnetworks = network; this.socialnetworks.filter(network => network.checked = true);
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using genders service. */
  fetchData3() {
    this.gendersService.getAllGenders().subscribe(gender => {
      this.genders = gender; this.genders.filter(gender => gender.checked = true);
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using private users service. */
  fetchData4() {
    this.privateUsersService.getAllPrivateUsers().subscribe(users => {
      this.privateusers = users;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using legal users service. */
  fetchData5() {
    this.legalUsersService.getAllLegalUsers().subscribe(users => {
      this.legalusers = users;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using country audience service. */
  fetchData6() {
    this.countryAudienceService.getAllCountryAudience().subscribe(audience => {
      this.countryaudience = audience;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using gender audience service. */
  fetchData7() {
    this.genderAudienceService.getAllGenderAudience().subscribe(audience => {
      this.genderaudience = audience;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using performer services service. */
  fetchData8() {
    this.performerServicesService.getFullInfoGenderAudience().subscribe(service => {
      this.performerservicesforgender = service;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using orders service. */
  fetchData9() {
    this.orderService.getAllOrders().subscribe(order => {
      this.orders = order;
    },
      err => {
        console.log(err);
      });
  }

  /* Get performer id by performer name. */
  getPerformerIdByName(name) {
    for (var j = 0; j < this.privateusers.length; j++) {
      if (name.includes(this.privateusers[j].Name)) {
        return this.privateusers[j].UserID;
      }
    }
    for (var j = 0; j < this.legalusers.length; j++) {
      if (name.includes(this.legalusers[j].CompanyName)) {
        return this.legalusers[j].UserID;
      }
    }
  }

  /* Check whether the same order is existed in the orders table. */
  containsTheSameOrder(obj) {
    for (var i = 0; i < this.orders.length; i++) {
      if (this.orders[i].CustomerID == obj.CustomerID && this.orders[i].PerformerID == obj.PerformerID && this.orders[i].ServiceID == obj.ServiceID && this.orders[i].OrderStatus == "Expected") {
        return true;
      }
    }
    return false;
  }

  /* User ordering. */
  selectService(service_id, performer_name) {
    var order = {
      CustomerID: (this.authService.getLoggedInUser()).UserID,
      PerformerID: this.getPerformerIdByName(performer_name),
      ServiceID: service_id,
      OrderStatus: "Expected"
    };
    if (!this.containsTheSameOrder(order)) {
      this.orderService.insertOrder(order).subscribe(() => { this.fetchData9(); });
    }
  }

  /* Filter services by some parameter. */
  filter() {
    var countriesForFilter = this.countries.filter(country => country.checked == true);
    var gendersForFilter = this.genders.filter(gender => gender.checked == true);
    var networksForFilter = this.socialnetworks.filter(network => network.checked == true);
    if (countriesForFilter.length > 0) {
      let arr = [];
      for (var i = 0; i < this.performerservicesforcountry.length; i++) {
        for (var j = 0; j < countriesForFilter.length; j++) {
          if (this.performerservicesforcountry[i].CountryAudience.includes(countriesForFilter[j].CountryName) && !arr.some(elem => elem.ServiceID === this.performerservicesforcountry[i].ServiceID)) {
            arr.push(this.performerservicesforcountry[i]);
          }
        }
      }
      this.performerservicesforcountry = arr;
    }
    if (gendersForFilter.length > 0) {
      let arr = [];
      for (var i = 0; i < this.performerservicesforcountry.length; i++) {
        for (var j = 0; j < gendersForFilter.length; j++) {
          if (this.performerservicesforcountry[i].GenderAudience.includes(gendersForFilter[j].GenderName) && !arr.some(elem => elem.ServiceID === this.performerservicesforcountry[i].ServiceID)) {
            arr.push(this.performerservicesforcountry[i]);
          }
        }
      }
      this.performerservicesforcountry = arr;
    }
    if (networksForFilter.length > 0) {
      let arr = [];
      for (var i = 0; i < this.performerservicesforcountry.length; i++) {
        for (var j = 0; j < networksForFilter.length; j++) {
          if (this.performerservicesforcountry[i].NetworkName == networksForFilter[j].NetworkName) {
            arr.push(this.performerservicesforcountry[i]);
          }
        }
      }
      this.performerservicesforcountry = arr;
    }
    if (this.pricefrom && this.priceto) {
      if (this.pricefrom < 0 || this.priceto < 0 || this.pricefrom > this.priceto) {
        return alert("Please, check your input price values!");
      } else {
        this.performerservicesforcountry = this.performerservicesforcountry.filter(elem => elem.Price >= this.pricefrom).filter(elem => elem.Price <= this.priceto);
      }
    }
    if (this.subscribersfrom && this.subscribersto) {
      if (this.subscribersfrom < 0 || this.subscribersto < 0 || this.subscribersfrom > this.subscribersto) {
        return alert("Please, check your input subscribers values!");
      } else {
        this.performerservicesforcountry = this.performerservicesforcountry.filter(elem => elem.Subscribers >= this.subscribersfrom).filter(elem => elem.Subscribers <= this.subscribersto);
      }
    }
  }

  /* Reset filtration after button clicking. */
  resetFilter() {
    this.fetchData();
    this.fetchData1();
    this.fetchData2();
    this.fetchData3();
  }

  /* Sorting services table. */
  changeSort() {
    if (this.sortingType == "0") {
      this.performerservicesforcountry.sort((a, b) => parseFloat(a.ServiceID) - parseFloat(b.ServiceID));
    } else if (this.sortingType == "1") {
      this.performerservicesforcountry.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
    } else if (this.sortingType == "2") {
      this.performerservicesforcountry.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
    } else if (this.sortingType == "3") {
      this.performerservicesforcountry.sort((a, b) => parseFloat(a.Subscribers) - parseFloat(b.Subscribers));
    } else if (this.sortingType == "4") {
      this.performerservicesforcountry.sort((a, b) => parseFloat(b.Subscribers) - parseFloat(a.Subscribers));
    }
  }
}
