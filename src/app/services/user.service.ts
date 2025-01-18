import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Admin, Customer, OrderProcessor, User} from '../model/user.model';
import { Subject } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) { }
  private refreshUserListSource = new Subject<void>();
  refreshUserList$ = this.refreshUserListSource.asObservable();

  triggerRefreshUserList() {
    this.refreshUserListSource.next();
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customer`);
  }
  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/admin`);
  }
  getOrderProcessors(): Observable<OrderProcessor[]> {
    return this.http.get<OrderProcessor[]>(`${this.apiUrl}/order-processor`);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/customer/${id}`);
  }
  getAdminById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/admin/${id}`);
  }
  getOrderProcessorById(id: number): Observable<OrderProcessor> {
    return this.http.get<OrderProcessor>(`${this.apiUrl}/order-processor/${id}`);
  }

  createAdmin(admin: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/admin`, admin);
  }
  createOrderProcessor(processor: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/order-processor`, processor);
  }
  createCustomer(customer: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/customer`, customer);
  }

  updateCustomer(id: number | undefined, user: Customer): Observable<Customer>{
    return this.http.put<Customer>(`${this.apiUrl}/customer/${id}`, user);
  }
  updateAdmin(id: number | undefined, user: Admin): Observable<Admin>{
    return this.http.put<Admin>(`${this.apiUrl}/admin/${id}`, user);
  }
  updateOrderProcessor(id: number | undefined, user: OrderProcessor): Observable<OrderProcessor>{
    return this.http.put<OrderProcessor>(`${this.apiUrl}/order-processor/${id}`, user);
  }

  deleteUser(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.apiUrl, body).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }
}
