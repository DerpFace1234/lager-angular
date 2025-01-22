import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../model/order.model';
import {OrderMiddleman} from '../model/orderMiddleman.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/order-processing';
  constructor(private http: HttpClient) {}

  createOrder(order: OrderMiddleman): Observable<OrderMiddleman> {
    return this.http.post<OrderMiddleman>(`${this.apiUrl}/orders`, order, { withCredentials: true });
  }

  getOrdersOfCustomer(id: number | undefined): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/customer/${id}`);
  }

  getOrdersOfProcessor(id: number | undefined): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/order-processor/${id}`);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  getOrderById(id: number | undefined): Observable<OrderMiddleman> {
    return this.http.get<OrderMiddleman>(`${this.apiUrl}/orders/${id}`);
  }

  updateStatus(id: number | undefined, status:string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/orders/status/${id}`, status)
  }
}
