import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';  // URL des Spring Boot Servers

  constructor(private http: HttpClient) { }

  // Subject for triggering the refresh
  private refreshUserListSource = new Subject<void>();

  // Observable for components to subscribe to
  refreshUserList$ = this.refreshUserListSource.asObservable();

  // Method to call to trigger the refresh
  triggerRefreshUserList() {
    this.refreshUserListSource.next();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
