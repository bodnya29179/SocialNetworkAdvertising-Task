/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { SocialNetworksService } from 'src/app/services/social-networks.service';
import { PrivateUsersService } from 'src/app/services/private-users.service';
import { LegalUsersService } from 'src/app/services/legal-users.service';
import { PerformerServicesService } from 'src/app/services/performer-services.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-performer-services',
  templateUrl: './admin-performer-services.component.html',
  styleUrls: ['./admin-performer-services.component.css']
})

/* Module view using class. */
export class AdminPerformerServicesComponent implements OnInit {

  socialnetworks: any = [];
  privateusers: any = [];
  legalusers: any = [];
  performerservices: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = "";

  /* Using services. */
  constructor(private privateUsersService: PrivateUsersService, private legalUsersService: LegalUsersService, private performerServicesServive: PerformerServicesService, private socialNetworksService: SocialNetworksService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
    this.data.UserID = 'none';
    this.data.SocialNetworkID = 'none';
  }

  /* Load data to variable using performer services service. Changing table fields data. */
  fetchData1() {
    this.fetchData2();
    this.fetchData3();
    this.fetchData4();
    this.performerServicesServive.getAllPerformerServices().subscribe(service => {
      this.performerservices = service;
      for (var i = 0; i < this.performerservices.length; i++) {
        for (var j = 0; j < this.privateusers.length; j++) {
          if (this.performerservices[i].UserID == this.privateusers[j].UserID) {
            this.performerservices[i].UserID = this.privateusers[j].Name + " " + this.privateusers[j].Surname;
          }
        }
      }
      for (var i = 0; i < this.performerservices.length; i++) {
        for (var j = 0; j < this.legalusers.length; j++) {
          if (this.performerservices[i].UserID == this.legalusers[j].UserID) {
            this.performerservices[i].UserID = this.legalusers[j].CompanyName;
          }
        }
      }
      for (var i = 0; i < this.performerservices.length; i++) {
        for (var j = 0; j < this.socialnetworks.length; j++) {
          if (this.performerservices[i].SocialNetworkID == this.socialnetworks[j].SocialNetworkID) {
            this.performerservices[i].SocialNetworkID = this.socialnetworks[j].NetworkName;
          }
        }
      }
    },
      err => {
        console.log(err);
      });
  }

  /* Get private performers list. */
  PrivateUsersList() {
    return this.privateusers.filter(private_users => private_users.TypeID == 3);
  }

  /* Get legal performers list. */
  LegalUsersList() {
    return this.legalusers.filter(legal_users => legal_users.TypeID == 3);
  }

  /* Load data to variable using private users service. */
  fetchData2() {
    this.privateUsersService.getAllPrivateUsers().subscribe(users => {
      this.privateusers = users;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using legal users service. */
  fetchData3() {
    this.legalUsersService.getAllLegalUsers().subscribe(users => {
      this.legalusers = users;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using social networks service. */
  fetchData4() {
    this.socialNetworksService.getAllSocialNetworks().subscribe(network => {
      this.socialnetworks = network;
    },
      err => {
        console.log(err);
      });
  }

  /* Reset create form after button clicking. */
  resetCreateForm() {
    this.data = {};
    this.data.UserID = 'none';
    this.data.SocialNetworkID = 'none';
  }

  /* Reset update form after button clicking. */
  resetUpdateForm() {
    this.changingData = {};
  }

  /* Create a new performer service using service. Writing data to a database table. */
  createPerformerService() {
    if (this.data.UserID != 'none' && this.data.SocialNetworkID != 'none' && this.data.ProfileID && this.data.Price) {
      if (this.data.Price < 0 || this.data.Subscribers < 0) {
        alert("Value must be positive!");
      } else {
        this.performerServicesServive.insertPerformerService(this.data).subscribe(() => { this.fetchData1(); });
        for (var j = 0; j < this.privateusers.length; j++) {
          if (this.privateusers[j].UserID == this.data.UserID) {
            this.data.UserID = this.privateusers[j].Name + " " + this.privateusers[j].Surname;
          }
        }
        for (var j = 0; j < this.legalusers.length; j++) {
          if (this.legalusers[j].UserID == this.data.UserID) {
            this.data.UserID = this.legalusers[j].CompanyName;
          }
        }
        this.performerservices.push({
          ServiceID: this.performerservices[this.performerservices.length - 1].ServiceID + 1,
          UserID: this.data.UserID,
          SocialNetworkID: this.getSocialNetworkNameById(this.data.SocialNetworkID),
          ProfileID: this.data.ProfileID,
          Subscribers: this.data.Subscribers,
          Price: this.data.Price
        }
        );
        this.visibleForm = "";
      }
    } else {
      alert("Input or select fields must not be empty!");
    }
  }

  /* Update performer service data using a service. */
  updatePerformerService() {
    if (this.changingData.SocialNetworkID != 'none' && this.changingData.ProfileID && this.changingData.Price) {
      if (this.changingData.Price < 0 || this.changingData.Subscribers < 0) {
        alert("Value must be positive!"); this.visibleForm = "";
      } else {
        this.performerServicesServive.updatePerformerService(this.changingData).subscribe(() => { this.fetchData1(); });
        for (var i = 0; i < this.performerservices.length; i++) {
          if (this.changingData.ServiceID == this.performerservices[i].ServiceID) {
            this.performerservices[i].UserID = this.changingData.UserName;
            this.performerservices[i].SocialNetworkID = this.getSocialNetworkNameById(this.changingData.SocialNetworkID);
            this.performerservices[i].ProfileID = this.changingData.ProfileID;
            this.performerservices[i].Subscribers = this.changingData.Subscribers;
            this.performerservices[i].Price = this.changingData.Price;
          }
        }
        this.visibleForm = "";
      }
    } else {
      alert("Input or select fields must not be empty!");
    }
  }

  /* Get social network name by social network id. */
  getSocialNetworkNameById(id) {
    for (var j = 0; j < this.socialnetworks.length; j++) {
      if (this.socialnetworks[j].SocialNetworkID == id) {
        return this.socialnetworks[j].NetworkName;
      }
    }
  }

  /* Get data from form for updating performer service data. */
  getPerformerServiceForUpdate(id, username) {
    this.performerServicesServive.getPerformerServiceByID(id).subscribe(service => {
      this.changingData.ServiceID = service[0].ServiceID;
      this.changingData.UserID = service[0].UserID;
      this.changingData.SocialNetworkID = service[0].SocialNetworkID;
      this.changingData.UserName = username;
      this.changingData.ProfileID = service[0].ProfileID;
      this.changingData.Subscribers = service[0].Subscribers;
      this.changingData.Price = service[0].Price;
    },
      err => {
        console.log(err);
      });
  }

  /* Remove selected performer service from database table. */
  deletePerformerService(id) {
    this.performerServicesServive.deletePerformerService(id).subscribe(() => { this.fetchData1(); });
    this.performerservices = this.performerservices.filter(service => service.ServiceID != id);
  }
}
