/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})

/* Module view using class. */
export class AdminHeaderComponent implements OnInit {

  currentUser: any = {};

  /* Using services. */
  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = this.authService.getLoggedInUser();
  }

  /* Perform component initialization. */
  ngOnInit() {
    if (Object.entries(this.currentUser).length === 0 && this.currentUser.constructor === Object) {
      this.router.navigate(['/login']);
    }
  }

  /* User's logout after session. */
  logOut() {
    this.currentUser = {};
    this.authService.setLoggedInUser({});
  }
}
