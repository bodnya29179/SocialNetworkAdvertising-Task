import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminUsers {
  CountryID: number;
  Email: string;
  Password: string;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with admin users data. */

export class AdminUsersService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all admin's data. */
  getAllAdminUsers(): Observable<AdminUsers[]> {
    return this.http.get<AdminUsers[]>('http://localhost:3000/adminusers/');
  }

  /* Load data by admin's id. */
  getAdminUserByID(id: number): Observable<AdminUsers> {
    return this.http.get<AdminUsers>('http://localhost:3000/adminusers/' + id);
  }

  /* Writing data to a table with admin user type. */
  insertAdminUser(user: AdminUsers): Observable<AdminUsers> {
    return this.http.post<AdminUsers>('http://localhost:3000/adminusers/create', user);
  }

  /* Updating table data. */
  updateAdminUser(user: AdminUsers): Observable<void> {
    return this.http.put<void>('http://localhost:3000/adminusers/update/', user);
  }

  /* Delete table data. */
  deleteAdminUser(id: number) {
    return this.http.delete('http://localhost:3000/adminusers/delete/' + id);
  }
}
