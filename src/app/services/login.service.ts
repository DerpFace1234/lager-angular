import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Admin, Customer, OrderProcessor} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginVisible = new BehaviorSubject<boolean>(false);
  loginVisible$ = this.loginVisible.asObservable();
  private refreshLoginSource = new Subject<void>();
  refreshLogin$ = this.refreshLoginSource.asObservable();
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  getCustomer(): Customer {
    return JSON.parse(sessionStorage.getItem('customer') || '{}');
  }

  getAdmin(): Admin {
    return JSON.parse(sessionStorage.getItem('admin') || '{}');
  }

  getOrderProcessor(): OrderProcessor {
    return JSON.parse(sessionStorage.getItem('orderProcessor') || '{}');
  }

  getToken(): string {
    return sessionStorage.getItem('token') || '';
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('customer');
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('orderProcessor');
    this.triggerRefreshLogin();
  }

  showLogin() {
    this.loginVisible.next(true);
  }

  hideLogin() {
    this.loginVisible.next(false);
  }

  triggerRefreshLogin() {
    this.refreshLoginSource.next();
  }
}
