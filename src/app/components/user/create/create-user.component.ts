import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Admin, Customer, OrderProcessor, User, UserType} from '../../../model/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent{
  user: User | Admin | OrderProcessor | Customer = new User('', '', '', '', new Date(), '', '', '', UserType.Customer);
  admin: Admin = new Admin('', '', '', '', new Date(), '', '', '', UserType.Admin, '');
  orderProcessor: OrderProcessor = new OrderProcessor('', '', '', '', new Date(), '', '', '', UserType.OrderProcessor, [], [],'', '');
  customer: Customer = new Customer('', '', '', '', new Date(), '', '', '', UserType.Admin, []);
  userTypes = Object.values(UserType);
  selectedUserType: UserType = UserType.Customer;
  constructor(private userService: UserService, private fb: FormBuilder) {}

  onUserTypeChange(){
    switch(this.selectedUserType){
      case UserType.Admin:
        this.user = { ...this.admin };
        break;
      case UserType.OrderProcessor:
        this.user = { ...this.orderProcessor };
        break;
      case UserType.Customer:
        this.user = { ...this.customer };
        break;
    }
  }

  onSubmit(form: any): void{
    if(form.valid){
      if(this.selectedUserType == UserType.Customer){
        this.userService.createCustomer(this.user).subscribe(
          response => this.handleCreation(response),
          error => this.handleError(error)
        );
      } if(this.selectedUserType == UserType.Admin){
        this.userService.createAdmin(this.user).subscribe(
          response => this.handleCreation(response),
          error => this.handleError(error)
        );
      } else {
        this.userService.createOrderProcessor(this.user).subscribe(
          response => this.handleCreation(response),
          error => this.handleError(error)
        );
      }
    }
  }

  private handleCreation(response: any): void {
    this.user = new User('', '', '', '', new Date(), '', '', '', UserType.Customer);
    this.onUserTypeChange();
    this.userService.triggerRefreshUserList();
  }

  private handleError(error: any): void {
    console.error("Error creating user", error);
  }
}
