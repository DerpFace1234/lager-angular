import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() isVisible = false;
  @Output() closeOverlay = new EventEmitter<void>();

  constructor(public loginService: LoginService, private router: Router) {}

  onSubmit(): void {
    this.loginService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.loginService.userPresent = true;
        this.close(false);
        this.email = "";
        this.password = "";
        this.loginService.errorMessage = "";
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });

        this.loginService.triggerRefreshLogin();
      },
      error: (err: any) => {
        this.loginService.errorMessage = 'Invalid credentials, please try again.';
      }
    });
  }

  close(other: boolean = false): void {
    if(other){
      const currentUrl = this.router.url;
      if ((currentUrl !== '/configurer') && (currentUrl !== '/picker/:type/:variant')
        && (currentUrl !== 'all') && (currentUrl !== 'checkout') && (currentUrl !== '')) {
        this.router.navigate(['']).then(() => location.reload());
      }
    }
    this.closeOverlay.emit();
    this.loginService.errorMessage = '';
  }

  protected readonly UserType = UserType;
}
