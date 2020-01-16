import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CountryAudience {
  ServiceID: number;
  CountryID: number;
  AudiencePercentage: number;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with country audience data. */

export class CountryAudienceService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all audience data in every country. */
  getAllCountryAudience(): Observable<CountryAudience[]> {
    return this.http.get<CountryAudience[]>('http://localhost:3000/countryaudience/');
  }

  /* Load data by country id (id2) and service id (id1). */
  getCountryAudienceByServiceID(id1: number, id2: number): Observable<CountryAudience> {
    return this.http.get<CountryAudience>('http://localhost:3000/countryaudience/' + id1 + '/' + id2);
  }

  /* Writing data to a table. */
  insertCountryAudience(countryaudience: CountryAudience): Observable<CountryAudience> {
    return this.http.post<CountryAudience>('http://localhost:3000/countryaudience/create', countryaudience);
  }

  /* Updating table data. */
  updateCountryAudience(countryaudience: CountryAudience): Observable<void> {
    return this.http.put<void>('http://localhost:3000/countryaudience/update/', countryaudience);
  }

  /* Delete table data by country id (id1) and service id (id2). */
  deleteCountryAudience(id1: number, id2: number) {
    return this.http.delete('http://localhost:3000/countryaudience/delete/' + id1 + '/' + id2);
  }
}
