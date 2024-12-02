import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService} from '../../../services/login.service';
import {UserType} from '../../../model/user.model';
import {HeaderComponent} from '../../front-page/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  @Input() isVisible = false;
  @Output() closeOverlay = new EventEmitter<void>();

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(): void {
    this.loginService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('customer', JSON.stringify(response.customer));
        sessionStorage.setItem('admin', JSON.stringify(response.admin));
        sessionStorage.setItem('orderProcessor', JSON.stringify(response.orderProcessor));
        this.close();
        this.router.navigate(['/dashboard']);
        this.loginService.triggerRefreshLogin();
      },
      error: (err: any) => {
        this.errorMessage = 'Invalid credentials, please try again.';
      }
    });
  }

  close() {
    this.closeOverlay.emit();
  }

  protected readonly UserType = UserType;
}
