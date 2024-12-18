import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../../services/login.service';
import {Admin, Customer, OrderProcessor, UserType} from '../../../model/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  customer: Customer | undefined;
  admin: Admin | undefined;
  orderProcessor: OrderProcessor | undefined;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.getUser().subscribe((data: Customer | Admin | OrderProcessor) => {
      if(data instanceof Customer){
        this.customer = data;
      } else if(data instanceof Admin){
        this.admin = data;
      } else {
        this.orderProcessor = data;
      }
    }, (error) => {
      console.error('Failed to fetch logged in user:', error);
    });
  }

  protected readonly UserType = UserType;
}
