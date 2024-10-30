import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Admin, OrderProcessor, User} from '../model/user.model';
import { Subject } from 'rxjs';

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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/admin`);
  }

  getOrderProcessors(): Observable<OrderProcessor[]> {
    return this.http.get<OrderProcessor[]>(`${this.apiUrl}/order-processor`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
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

  deleteUser(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
