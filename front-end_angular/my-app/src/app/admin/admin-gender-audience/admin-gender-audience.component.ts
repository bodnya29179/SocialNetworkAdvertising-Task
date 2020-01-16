/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { GendersService } from 'src/app/services/genders.service';
import { PerformerServicesService } from 'src/app/services/performer-services.service';
import { GenderAudienceService } from 'src/app/services/gender-audience.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-gender-audience',
  templateUrl: './admin-gender-audience.component.html',
  styleUrls: ['./admin-gender-audience.component.css']
})

/* Module view using class. */
export class AdminGenderAudienceComponent implements OnInit {

  genderaudience: any = [];
  performerservices: any = [];
  genders: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = "";

  /* Using services. */
  constructor(private genderAudienceService: GenderAudienceService, private performerServicesService: PerformerServicesService, private gendersService: GendersService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
    this.data.ServiceID = 'none';
    this.data.GenderID = 'none';
  }

  /* Load data to variable using gender audience service. Changing table fields data. */
  fetchData1() {
    this.fetchData2();
    this.fetchData3();
    this.genderAudienceService.getAllGenderAudience().subscribe(gender => {
      this.genderaudience = gender;
      for (var i = 0; i < this.genderaudience.length; i++) {
        for (var j = 0; j < this.genders.length; j++) {
          if (this.genderaudience[i].GenderID == this.genders[j].GenderID) {
            this.genderaudience[i].GenderID = this.genders[j].GenderName;
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

  /* Load data to variable using genders service. */
  fetchData3() {
    this.gendersService.getAllGenders().subscribe(gender => {
      this.genders = gender;
    },
      err => {
        console.log(err);
      });
  }

  /* Reset create form after button clicking. */
  resetCreateForm() {
    this.data = {};
    this.data.ServiceID = 'none';
    this.data.GenderID = 'none';
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

  /* Create a new gender audience using service. Writing data to a database table. */
  createGenderAudience() {
    if (this.data.AudiencePercentage && this.data.serviceID != 'none' && this.data.GenderID != 'none') {
      if (!this.genderaudience.find(audience => audience.ServiceID == this.data.ServiceID && audience.GenderID == this.genders.find(gender => gender.GenderID == this.data.GenderID).GenderName)) {
        var currentPercent = this.audiencePercentageSum(this.genderaudience.filter(audience => audience.ServiceID == this.data.ServiceID)) + (+this.data.AudiencePercentage);
        if (currentPercent > 100) {
          alert("Percent sum must not be bigger than 100%!");
        } else if (this.data.AudiencePercentage < 0) {
          alert("Audience percentage must be positive!");
        } else if (this.data.AudiencePercentage > 100) {
          alert("Audience percentage must not be less than 100%!");
        } else {
          this.genderAudienceService.insertGenderAudience(this.data).subscribe(() => { this.fetchData1(); });
          for (var j = 0; j < this.genders.length; j++) {
            if (this.genders[j].GenderID == this.data.GenderID) {
              this.data.GenderID = this.genders[j].GenderName;
            }
          }
          this.genderaudience.push({
            ServiceID: this.data.ServiceID,
            GenderID: this.data.GenderID,
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

  /* Update gender audience data using a service. */
  updateGenderAudience() {
    if (this.changingData.AudiencePercentage) {
      var currentPercent = this.audiencePercentageSum(this.genderaudience.filter(audience => audience.ServiceID == this.changingData.ServiceID && audience.GenderID != this.changingData.GenderName)) + (+this.changingData.AudiencePercentage);
      // similar working code for audiencePercentageSum() function: this.genderaudience.filter(audience => audience.ServiceID == this.changingData.ServiceID).filter(audience => audience.GenderID != this.changingData.GenderName)
      if (currentPercent > 100) {
        alert("Percent sum must not be bigger than 100%!"); this.visibleForm = "";
      } else if (this.changingData.AudiencePercentage < 0) {
        alert("Audience percentage must be positive!"); this.visibleForm = "";
      } else if (this.changingData.AudiencePercentage > 100) {
        alert("Audience percentage must not be less than 100%!"); this.visibleForm = "";
      } else {
        this.genderAudienceService.updateGenderAudience(this.changingData).subscribe(() => { this.fetchData1(); });
        for (var i = 0; i < this.genderaudience.length; i++) {
          if (this.changingData.ServiceID == this.genderaudience[i].ServiceID && this.changingData.GenderID == this.getGenderIdByName(this.genderaudience[i].GenderID)) {
            this.genderaudience[i].AudiencePercentage = this.changingData.AudiencePercentage;
          }
        }
        this.visibleForm = "";
      }
    } else {
      alert("Input field <<Audience Percentage>> must not be empty!"); this.visibleForm = "";
    }
  }

  /* Get data from form for updating gender audience data. */
  getGenderAudienceForUpdate(id1, id2) {
    this.genderAudienceService.getGenderAudienceByServiceID(id1, this.getGenderIdByName(id2)).subscribe(audience => {
      this.changingData.ServiceID = audience[0].ServiceID;
      this.changingData.GenderID = audience[0].GenderID;
      this.changingData.GenderName = id2;
      this.changingData.AudiencePercentage = audience[0].AudiencePercentage;
    },
      err => {
        console.log(err);
      });
  }

  /* Get gender id by gender name. */
  getGenderIdByName(gendername) {
    for (var i = 0; i < this.genders.length; i++) {
      if (this.genders[i].GenderName == gendername) {
        return this.genders[i].GenderID;
      }
    }
  }

  /* Remove selected gender audience from database table. */
  deleteGenderAudience(serviceID, genderID, audiencePercentage) {
    this.genderAudienceService.deleteGenderAudience(serviceID, this.getGenderIdByName(genderID)).subscribe(() => { this.fetchData1(); });
    this.genderaudience = this.genderaudience.filter(audience => {
      var obj = { "ServiceID": serviceID, "GenderID": genderID, "AudiencePercentage": audiencePercentage };
      return JSON.stringify(audience) != JSON.stringify(obj);
    });
  }
}
