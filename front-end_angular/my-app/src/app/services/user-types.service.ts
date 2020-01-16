import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserTypes {
  TypeName: string;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with user types data. */

export class UserTypesService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all user types data. */
  getAllUserTypes(): Observable<UserTypes[]> {
    return this.http.get<UserTypes[]>('http://localhost:3000/usertypes/');
  }

  /* Load data by type id. */
  getUserTypeByID(id: number): Observable<UserTypes> {
    return this.http.get<UserTypes>('http://localhost:3000/usertypes/' + id);
  }

  /* Writing data to a table. */
  insertUserType(usertype: UserTypes): Observable<UserTypes> {
    return this.http.post<UserTypes>('http://localhost:3000/usertypes/create', usertype);
  }

  /* Updating table data. */
  updateUserType(usertype: UserTypes): Observable<void> {
    return this.http.put<void>('http://localhost:3000/usertypes/update/', usertype);
  }

  /* Delete table data. */
  deleteUserType(id: number) {
    return this.http.delete('http://localhost:3000/usertypes/delete/' + id);
  }
}
