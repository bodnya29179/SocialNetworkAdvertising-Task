import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Genders {
  GenderName: string;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with genders data. */

export class GendersService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all genders data. */
  getAllGenders(): Observable<Genders[]> {
    return this.http.get<Genders[]>('http://localhost:3000/genders/');
  }

  /* Load data by gender id. */
  getGenderByID(id: number): Observable<Genders> {
    return this.http.get<Genders>('http://localhost:3000/genders/' + id);
  }

  /* Writing data to a table. */
  insertGender(gender: Genders): Observable<Genders> {
    return this.http.post<Genders>('http://localhost:3000/genders/create', gender);
  }

  /* Updating table data. */
  updateGender(gender: Genders): Observable<void> {
    return this.http.put<void>('http://localhost:3000/genders/update/', gender);
  }

  /* Delete table data. */
  deleteGender(id: number) {
    return this.http.delete('http://localhost:3000/genders/delete/' + id);
  }
}
