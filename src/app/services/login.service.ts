import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Admin, Customer, OrderProcessor, UserType} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginVisible = new BehaviorSubject<boolean>(false);
  loginVisible$ = this.loginVisible.asObservable();
  private refreshLoginSource = new Subject<void>();
  refreshLogin$ = this.refreshLoginSource.asObservable();
  private apiUrl = 'http://localhost:8080/api/auth';
  private apiUrlInfo = 'http://localhost:8080/api/users/info';
  public userPresent: boolean = false;
  public userType: UserType | null = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  public async handleStuff(): Promise<void> {
    try {
      this.userPresent = await this.checkSession().toPromise() ?? false;
      const data = await this.getUser().toPromise();
      data?this.userType = data.type:0;

    } catch (error) {
      console.error('Error occurred:', error);
      this.userType = null;
      this.userPresent = false;
      this.errorMessage = 'Login required.';
      this.showLogin();
    }
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(tap(response => {
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
    }));
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, { withCredentials: true });
  }

  checkSession(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check`, { withCredentials: true });
  }

  getUser(): Observable<Customer | Admin | OrderProcessor> {
    return this.http.get<Customer | Admin | OrderProcessor>(this.apiUrlInfo, { withCredentials: true });
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
