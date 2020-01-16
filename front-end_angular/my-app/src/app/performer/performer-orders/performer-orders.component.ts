/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-performer-orders',
  templateUrl: './performer-orders.component.html',
  styleUrls: ['./performer-orders.component.css']
})

/* Module view using class. */
export class PerformerOrdersComponent implements OnInit {

  orders: any = [];

  /* Using services. */
  constructor(private authService: AuthService, private ordersService: OrdersService) {
  }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
  }

  /* Load data to variable using orders service. */
  fetchData() {
    this.ordersService.getFullOrderInfoByPerformerID((this.authService.getLoggedInUser()).UserID).subscribe(orders => {
      this.orders = orders;
    },
      err => {
        console.log(err);
      });
  }

  /* Confirm the order afted button clicking. */
  confirmOrder(id) {
    this.ordersService.updateStatus({ OrderStatus: "Confirmed", OrderID: id }).subscribe(() => { this.fetchData(); });
    for (var i = 0; i < this.orders.length; i++) {
      if (id == this.orders[i].OrderID) {
        this.orders[i].OrderStatus = "Confirmed";
      }
    }
  }

  /* Reject the order afted button clicking. */
  rejectOrder(id) {
    this.ordersService.updateStatus({ OrderStatus: "Rejected", OrderID: id }).subscribe(() => { this.fetchData(); });
    for (var i = 0; i < this.orders.length; i++) {
      if (id == this.orders[i].OrderID) {
        this.orders[i].OrderStatus = "Rejected";
      }
    }
  }
}
