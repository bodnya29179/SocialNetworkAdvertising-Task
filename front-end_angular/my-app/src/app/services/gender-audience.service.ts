import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GenderAudience {
  ServiceID: number;
  GenderID: number;
  AudiencePercentage: number;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with gender audience data. */

export class GenderAudienceService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all audience data about every gender. */
  getAllGenderAudience(): Observable<GenderAudience[]> {
    return this.http.get<GenderAudience[]>('http://localhost:3000/genderaudience/');
  }

  /* Load data by gender id (id2) and service id (id1). */
  getGenderAudienceByServiceID(id1: number, id2: number): Observable<GenderAudience> {
    return this.http.get<GenderAudience>('http://localhost:3000/genderaudience/' + id1 + '/' + id2);
  }

  /* Writing data to a table. */
  insertGenderAudience(genderaudience: GenderAudience): Observable<GenderAudience> {
    return this.http.post<GenderAudience>('http://localhost:3000/genderaudience/create', genderaudience);
  }

  /* Updating table data. */
  updateGenderAudience(genderaudience: GenderAudience): Observable<void> {
    return this.http.put<void>('http://localhost:3000/genderaudience/update/', genderaudience);
  }

  /* Delete table data by gender id (id2) and service id (id1). */
  deleteGenderAudience(id1: number, id2: number) {
    return this.http.delete('http://localhost:3000/genderaudience/delete/' + id1 + '/' + id2);
  }
}
