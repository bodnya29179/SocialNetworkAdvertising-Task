import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LegalUsers {
  CompanyName: string;
  CountryID: number;
  Email: string;
  Password: string;
  TypeID: number;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with legal users data. */

export class LegalUsersService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all legal users data. */
  getAllLegalUsers(): Observable<LegalUsers[]> {
    return this.http.get<LegalUsers[]>('http://localhost:3000/legalusers/');
  }

  /* Load data by legal user id. */
  getLegalUserByID(id: number): Observable<LegalUsers> {
    return this.http.get<LegalUsers>('http://localhost:3000/legalusers/' + id);
  }

  /* Writing data to a table. */
  insertLegalUser(user: LegalUsers): Observable<LegalUsers> {
    return this.http.post<LegalUsers>('http://localhost:3000/legalusers/create', user);
  }

  /* Updating table data. */
  updateLegalUser(user: LegalUsers): Observable<void> {
    return this.http.put<void>('http://localhost:3000/legalusers/update/', user);
  }

  /* Delete table data. */
  deleteLegalUser(id: number) {
    return this.http.delete('http://localhost:3000/legalusers/delete/' + id);
  }
}
