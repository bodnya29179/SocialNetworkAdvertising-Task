import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SocialNetworks {
  NetworkName: string;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with social networks data. */

export class SocialNetworksService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all social networks data. */
  getAllSocialNetworks(): Observable<SocialNetworks[]> {
    return this.http.get<SocialNetworks[]>('http://localhost:3000/socialnetworks/');
  }

  /* Load data by social network id. */
  getSocialNetworkByID(id: number): Observable<SocialNetworks> {
    return this.http.get<SocialNetworks>('http://localhost:3000/socialnetworks/' + id);
  }

  /* Writing data to a table. */
  insertSocialNetwork(socialnetwork: SocialNetworks): Observable<SocialNetworks> {
    return this.http.post<SocialNetworks>('http://localhost:3000/socialnetworks/create', socialnetwork);
  }

  /* Updating table data. */
  updateSocialNetworks(socialnetwork: SocialNetworks): Observable<void> {
    return this.http.put<void>('http://localhost:3000/socialnetworks/update/', socialnetwork);
  }

  /* Delete table data. */
  deleteSocialNetwork(id: number) {
    return this.http.delete('http://localhost:3000/socialnetworks/delete/' + id);
  }
}
