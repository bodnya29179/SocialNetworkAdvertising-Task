import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Orders {
  CustomerID: number;
  PerformerID: number;
  ServiceID: number;
  OrderStatus: string;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with orders data. */

export class OrdersService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all orders data. */
  getAllOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>('http://localhost:3000/orders/');
  }

  /* Load data by order id. */
  getOrderByID(id: number): Observable<Orders> {
    return this.http.get<Orders>('http://localhost:3000/orders/' + id);
  }

  /* Load full orders data by customer id. */
  getFullOrderInfoByCustomerID(id: number): Observable<Orders> {
    return this.http.get<Orders>('http://localhost:3000/orders/full/customer/' + id);
  }

  /* Load full orders data by performer id. */
  getFullOrderInfoByPerformerID(id: number): Observable<Orders> {
    return this.http.get<Orders>('http://localhost:3000/orders/full/performer/' + id);
  }

  /* Writing data to a table. */
  insertOrder(order: Orders): Observable<Orders> {
    return this.http.post<Orders>('http://localhost:3000/orders/create', order);
  }

  /* Updating table data. */
  updateOrder(order: Orders): Observable<void> {
    return this.http.put<void>('http://localhost:3000/orders/update/', order);
  }

  /* Updating order status. */
  updateStatus(status: Object): Observable<void> {
    return this.http.put<void>('http://localhost:3000/orders/update/status', status);
  }

  /* Delete table data. */
  deleteOrder(id: number) {
    return this.http.delete('http://localhost:3000/orders/delete/' + id);
  }
}
