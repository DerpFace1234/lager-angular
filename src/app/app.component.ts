import { Component } from '@angular/core';
import {LoginService} from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lager-angular';
  isLoginVisible = false;

  constructor(private loginService: LoginService) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.isLoginVisible = visible;
    });
  }

  onCloseLogin() {
    this.loginService.hideLogin();
  }
}
