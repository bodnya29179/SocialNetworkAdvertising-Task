/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { SocialNetworksService } from 'src/app/services/social-networks.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-social-networks',
  templateUrl: './admin-social-networks.component.html',
  styleUrls: ['./admin-social-networks.component.css']
})

/* Module view using class. */
export class AdminSocialNetworksComponent implements OnInit {

  socialnetworks: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = "";

  /* Using service. */
  constructor(private socialNetworksService: SocialNetworksService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
  }

  /* Load data to variable using social networks service. */
  fetchData1() {
    this.socialNetworksService.getAllSocialNetworks().subscribe(socialnetworks => {
      this.socialnetworks = socialnetworks;
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

  /* Create a new social network using service. Writing data to a database table. */
  createSocialNetwork() {
    if (this.data.NetworkName) {
      if (!this.socialnetworks.find(network => network.NetworkName == this.data.NetworkName)) {
        this.socialNetworksService.insertSocialNetwork(this.data).subscribe(() => { this.fetchData1(); });
        this.socialnetworks.push({
          SocialNetworkID: this.socialnetworks[this.socialnetworks.length - 1].SocialNetworkID + 1,
          NetworkName: this.data.NetworkName
        }
        );
        this.visibleForm = "";
      } else {
        alert("Social network with this name exists!");
      }
    } else {
      alert("Input field must not be empty!"); this.visibleForm = "";
    }
  }

  /* Update social network data using a service. */
  updateSocialNetwork() {
    if (this.changingData.NetworkName) {
      if (!this.socialnetworks.find(network => network.NetworkName == this.changingData.NetworkName && network.SocialNetworkID != this.changingData.SocialNetworkID)) {
        this.socialNetworksService.updateSocialNetworks(this.changingData).subscribe(() => { this.fetchData1(); });
        for (var i = 0; i < this.socialnetworks.length; i++) {
          if (this.changingData.SocialNetworkID == this.socialnetworks[i].SocialNetworkID) {
            this.socialnetworks[i].NetworkName = this.changingData.NetworkName;
          }
        }
        this.visibleForm = "";
      } else {
        alert("Social network with this name exists!"); this.visibleForm = "";
      }
    } else {
      alert("Input field must not be empty!"); this.visibleForm = "";
    }
  }

  /* Get data from form for updating social network data. */
  getSocialNetworkForUpdate(id) {
    this.socialNetworksService.getSocialNetworkByID(id).subscribe(socialnetwork => {
      this.changingData.SocialNetworkID = socialnetwork[0].SocialNetworkID;
      this.changingData.NetworkName = socialnetwork[0].NetworkName;
    },
      err => {
        console.log(err);
      });
  }

  /* Remove selected social network from database table. */
  deleteSocialNetwork(id) {
    this.socialNetworksService.deleteSocialNetwork(id).subscribe(() => { this.fetchData1(); });
    this.socialnetworks = this.socialnetworks.filter(socialnetwork => socialnetwork.SocialNetworkID != id);
  }
}
