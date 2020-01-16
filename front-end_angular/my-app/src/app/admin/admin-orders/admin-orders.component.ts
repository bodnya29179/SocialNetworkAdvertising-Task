/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { PrivateUsersService } from 'src/app/services/private-users.service';
import { LegalUsersService } from 'src/app/services/legal-users.service';
import { PerformerServicesService } from 'src/app/services/performer-services.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})

/* Module view using class. */
export class AdminOrdersComponent implements OnInit {

  orders: any = [];
  privateusers: any = [];
  legalusers: any = [];
  customerusers: any = [];
  performerusers: any = [];
  performerservices: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = "";

  /* Using services. */
  constructor(private ordersService: OrdersService, private privateUsersService: PrivateUsersService, private legalUsersService: LegalUsersService, private performerServicesServive: PerformerServicesService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData1();
    this.data.CustomerID = 'none';
    this.data.PerformerID = 'none';
    this.data.ServiceID = 'none';
    this.data.OrderStatus = 'none';
  }

  /* Load data to variable using orders service. Changing table fields data. */
  fetchData1() {
    this.fetchData2();
    this.fetchData3();
    this.fetchData4();
    this.ordersService.getAllOrders().subscribe(orders => {
      this.orders = orders;
      for (var i = 0; i < this.orders.length; i++) {
        for (var j = 0; j < this.privateusers.length; j++) {
          if (this.orders[i].CustomerID == this.privateusers[j].UserID) {
            this.orders[i].CustomerID = this.privateusers[j].Name + " " + this.privateusers[j].Surname;
          }
          if (this.orders[i].PerformerID == this.privateusers[j].UserID) {
            this.orders[i].PerformerID = this.privateusers[j].Name + " " + this.privateusers[j].Surname;
          }
        }
      }
      for (var i = 0; i < this.orders.length; i++) {
        for (var j = 0; j < this.legalusers.length; j++) {
          if (this.orders[i].CustomerID == this.legalusers[j].UserID) {
            this.orders[i].CustomerID = this.legalusers[j].CompanyName;
          }
          if (this.orders[i].PerformerID == this.legalusers[j].UserID) {
            this.orders[i].PerformerID = this.legalusers[j].CompanyName;
          }
        }
      }
    },
      err => {
        console.log(err);
      });
  }

  /* Get private performers list. */
  PrivateUsersList(type) {
    return this.privateusers.filter(private_users => private_users.TypeID == type);
  }

  /* Get legal performers list. */
  LegalUsersList(type) {
    return this.legalusers.filter(legal_users => legal_users.TypeID == type);
  }

  /* Get performer services by performer id. */
  ServicesOfPerformer(performer) {
    return this.performerservices.filter(service => service.UserID == performer);
  }

  /* Load data to variable using private users service. */
  fetchData2() {
    this.privateUsersService.getAllPrivateUsers().subscribe(users => {
      this.privateusers = users;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using legal users service. */
  fetchData3() {
    this.legalUsersService.getAllLegalUsers().subscribe(users => {
      this.legalusers = users;
    },
      err => {
        console.log(err);
      });
  }

  /* Load data to variable using performer services service. */
  fetchData4() {
    this.performerServicesServive.getAllPerformerServices().subscribe(service => {
      this.performerservices = service;
    },
      err => {
        console.log(err);
      });
  }

  /* Reset create form after button clicking. */
  resetCreateForm() {
    this.data = {};
    this.data.CustomerID = 'none';
    this.data.PerformerID = 'none';
    this.data.ServiceID = 'none';
    this.data.OrderStatus = 'none';
  }

  /* Reset update form after button clicking. */
  resetUpdateForm() {
    this.changingData = {};
  }

  /* Create a new order service. Writing data to a database table. */
  createOrder() {
    if (this.data.CustomerID != 'none' && this.data.PerformerID != 'none' && this.data.ServiceID != 'none' && this.data.OrderStatus != 'none') {
      this.ordersService.insertOrder(this.data).subscribe(() => { this.fetchData1(); });
      for (var j = 0; j < this.privateusers.length; j++) {
        if (this.privateusers[j].UserID == this.data.CustomerID) {
          this.data.CustomerID = this.privateusers[j].Name + " " + this.privateusers[j].Surname;
        }
        if (this.privateusers[j].UserID == this.data.PerformerID) {
          this.data.PerformerID = this.privateusers[j].Name + " " + this.privateusers[j].Surname;
        }
      }
      for (var j = 0; j < this.legalusers.length; j++) {
        if (this.legalusers[j].UserID == this.data.CustomerID) {
          this.data.CustomerID = this.legalusers[j].CompanyName;
        }
        if (this.legalusers[j].UserID == this.data.PerformerID) {
          this.data.PerformerID = this.legalusers[j].CompanyName;
        }
      }
      this.orders.push({
        OrderID: this.orders[this.orders.length - 1].OrderID + 1,
        CustomerID: this.data.CustomerID,
        PerformerID: this.data.PerformerID,
        ServiceID: this.data.ServiceID,
        OrderStatus: this.data.OrderStatus
      }
      );
      this.visibleForm = "";
    } else {
      alert("Select fields must not be empty!");
    }
  }

  /* Update order data using a service. */
  updateOrder() {
    if (this.changingData.ServiceID != 'none' && this.changingData.OrderStatus != 'none') {
      this.ordersService.updateOrder(this.changingData).subscribe(() => { this.fetchData1(); });
      for (var i = 0; i < this.orders.length; i++) {
        if (this.changingData.OrderID == this.orders[i].OrderID) {
          this.orders[i].CustomerID = this.changingData.CustomerName;
          this.orders[i].PerformerID = this.changingData.PeformerName;
          this.orders[i].ServiceID = this.changingData.ServiceID;
          this.orders[i].OrderStatus = this.changingData.OrderStatus;
        }
      }
      this.visibleForm = "";
    } else {
      alert("Select fields must not be empty!");
    }
  }

  /* Get data from form for updating order data. */
  getOrderForUpdate(id, customername, performername) {
    this.ordersService.getOrderByID(id).subscribe(order => {
      this.changingData.OrderID = order[0].OrderID;
      this.changingData.CustomerID = order[0].CustomerID;
      this.changingData.PerformerID = order[0].PerformerID;
      this.changingData.CustomerName = customername;
      this.changingData.PeformerName = performername;
      this.changingData.ServiceID = order[0].ServiceID;
      this.changingData.OrderStatus = order[0].OrderStatus;
    },
      err => {
        console.log(err);
      });
  }

  /* Remove selected order from database table. */
  deleteOrder(id) {
    this.ordersService.deleteOrder(id).subscribe(() => { this.fetchData1(); });
    this.orders = this.orders.filter(order => order.OrderID != id);
  }
}
