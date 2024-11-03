import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Admin, Customer, OrderProcessor, User, UserType} from '../../../model/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent{
  userTypes:UserType[] = Object.values(UserType);
  selectedUserType: UserType = UserType.Customer;
  constructor(private userService: UserService) {}

  valueStorage = {
    firstName: "",
    lastName: "",
    address: "",
    birthday: new Date(),
    email: "",
    phone: "",
    password: "",
    type: UserType,
    adminRole: "",
    processingArea: "",
    shift: "",
    feedbackMessage: ""
  }

  onSubmit(form: any): void{
    if(form.valid){
      this.valueStorage.feedbackMessage = "User successfully created!"
      if(this.selectedUserType === UserType.Customer){
        const customer: Customer = new Customer(this.valueStorage.firstName, this.valueStorage.lastName,
                                                this.valueStorage.address,
                                                this.valueStorage.birthday, this.valueStorage.email,
                                                this.valueStorage.phone, this.valueStorage.password,
                                                UserType.Customer, false, []);
        this.userService.createCustomer(customer).subscribe(
          response => this.handleCreation(response),
          error => this.handleError(error)
        );
      } if(this.selectedUserType === UserType.Admin){
        const admin: Admin = new Admin(this.valueStorage.firstName, this.valueStorage.lastName,
                                        this.valueStorage.address, this.valueStorage.birthday,
                                        this.valueStorage.email, this.valueStorage.phone,
                                        this.valueStorage.password, UserType.Admin,
                                        false, this.valueStorage.adminRole);
        this.userService.createAdmin(admin).subscribe(
          response => this.handleCreation(response),
          error => this.handleError(error)
        );
      } if(this.selectedUserType === UserType.OrderProcessor) {
        const processor: OrderProcessor = new OrderProcessor(this.valueStorage.firstName, this.valueStorage.lastName,
                                                            this.valueStorage.address, this.valueStorage.birthday,
                                                            this.valueStorage.email, this.valueStorage.phone,
                                                            this.valueStorage.password, UserType.OrderProcessor,
                                                            false, [], [], this.valueStorage.processingArea,
                                                            this.valueStorage.shift);
        this.userService.createOrderProcessor(processor).subscribe(
          response => this.handleCreation(response),
          error => this.handleError(error)
        );
      }
    } else{
      this.valueStorage.feedbackMessage = "Please fill in all fields."
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      });
    }
  }

  private handleCreation(response: any): void {
    this.valueStorage.firstName = "";
    this.valueStorage.lastName = "";
    this.valueStorage.address = "";
    this.valueStorage.birthday = new Date();
    this.valueStorage.email = "";
    this.valueStorage.phone = "";
    this.valueStorage.password = "";
    this.valueStorage.adminRole = "";
    this.valueStorage.processingArea = "";
    this.valueStorage.shift = "";
    this.userService.triggerRefreshUserList();
  }

  private handleError(error: any): void {
    console.error("Error creating user", error);
  }
}
