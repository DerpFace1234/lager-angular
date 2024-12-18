import { Component } from '@angular/core';
import {LoginService} from '../../../services/login.service';

@Component({
    selector: 'app-usermngmt-page',
    templateUrl: './user-mngmt.component.html',
    styleUrl: './user-mngmt.component.css'
})
export class UserMngmtComponent {
  isListVisible: boolean = false;

  onClickPanel(): void{
    this.isListVisible = true;
  }

  onClickClose(): void{
    this.isListVisible = false;
  }
}
