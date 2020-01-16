/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})

/* Module view using class. */
export class CustomerOrdersComponent implements OnInit {

  orders: any = [];

  /* Using services. */
  constructor(private authService: AuthService, private ordersService: OrdersService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
  }

  /* Load data to variable using orders service. */
  fetchData() {
    this.ordersService.getFullOrderInfoByCustomerID((this.authService.getLoggedInUser()).UserID).subscribe(orders => {
      this.orders = orders;
    },
      err => {
        console.log(err);
      });
  }
}
