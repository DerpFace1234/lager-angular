import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../../services/login.service';
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
    this.customer = this.loginService.getCustomer();
    this.admin = this.loginService.getAdmin();
    this.orderProcessor = this.loginService.getOrderProcessor();
  }

  protected readonly UserType = UserType;
}
