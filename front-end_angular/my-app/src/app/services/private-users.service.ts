import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PrivateUsers {
  Name: string;
  Surname: string;
  CountryID: number;
  Email: string;
  Password: string;
  TypeID: number;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with private users data. */

export class PrivateUsersService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all private users data. */
  getAllPrivateUsers(): Observable<PrivateUsers[]> {
    return this.http.get<PrivateUsers[]>('http://localhost:3000/privateusers/');
  }

  /* Load data by private user id. */
  getPrivateUserByID(id: number): Observable<PrivateUsers> {
    return this.http.get<PrivateUsers>('http://localhost:3000/privateusers/' + id);
  }

  /* Writing data to a table. */
  insertPrivateUser(user: PrivateUsers): Observable<PrivateUsers> {
    return this.http.post<PrivateUsers>('http://localhost:3000/privateusers/create', user);
  }

  /* Updating table data. */
  updatePrivateUser(user: PrivateUsers): Observable<void> {
    return this.http.put<void>('http://localhost:3000/privateusers/update/', user);
  }

  /* Delete table data. */
  deletePrivateUser(id: number) {
    return this.http.delete('http://localhost:3000/privateusers/delete/' + id);
  }
}
