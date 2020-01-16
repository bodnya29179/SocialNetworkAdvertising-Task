import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PerformerServices {
  ServiceID: number;
  UserID: number;
  SocialNetworkID: number;
  ProfileID: string;
  Subscribers: number;
  Price: number;
}

export interface PerformerServicesFull {
  UserID: number;
  SocialNetworkID: number;
  ProfileID: string;
  Subscribers: number;
  Price: number;
  GenderID1: number;
  ManAudience: number;
  GenderID2: number;
  WomanAudience: number;
  CountryID1: number;
  CountryAudience1: number;
  CountryID2: number;
  CountryAudience2: number;
  CountryID3: number;
  CountryAudience3: number;
  CountryID4: number;
  CountryAudience4: number;
  CountryID5: number;
  CountryAudience5: number;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with performers services data. */

export class PerformerServicesService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all performers services data. */
  getAllPerformerServices(): Observable<PerformerServices[]> {
    return this.http.get<PerformerServices[]>('http://localhost:3000/performerservices/');
  }

  /* Load full data about performer services including country audience. */
  getFullInfoCountryAudience(): Observable<PerformerServices[]> {
    return this.http.get<PerformerServices[]>('http://localhost:3000/performerservices/full/countryaudience');
  }

  /* Load full data about performer services including gender audience. */
  getFullInfoGenderAudience(): Observable<PerformerServices[]> {
    return this.http.get<PerformerServices[]>('http://localhost:3000/performerservices/full/genderaudience');
  }

  /* Load data by service id. */
  getPerformerServiceByID(id: number): Observable<PerformerServices> {
    return this.http.get<PerformerServices>('http://localhost:3000/performerservices/' + id);
  }

  /* Writing data to a table. */
  insertPerformerService(performerservice: PerformerServices): Observable<PerformerServices> {
    return this.http.post<PerformerServices>('http://localhost:3000/performerservices/create', performerservice);
  }

  /* Writing data to a table. */
  insertPerformerServiceFullInfo(performerservice: PerformerServicesFull): Observable<PerformerServices> {
    return this.http.post<PerformerServices>('http://localhost:3000/performerservices/create/full', performerservice);
  }

  /* Updating table data. */
  updatePerformerService(performerservice: PerformerServices): Observable<void> {
    return this.http.put<void>('http://localhost:3000/performerservices/update/', performerservice);
  }

  /* Delete table data. */
  deletePerformerService(id: number) {
    return this.http.delete('http://localhost:3000/performerservices/delete/' + id);
  }
}
