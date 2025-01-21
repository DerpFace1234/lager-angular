import {Component} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Admin, Customer, OrderProcessor, UserType} from '../../../model/user.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('300ms ease-in')]),
      transition(':leave', [animate('300ms ease-out')]),
    ])
  ],
})
export class CreateUserComponent{
  userTypes:UserType[] = Object.values(UserType);
  selectedUserType: UserType = UserType.CUSTOMER;
  constructor(private userService: UserService, private router: Router, public loginService: LoginService) {}

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

  ngOnInit(): void {
    this.loginService.handleStuff().then(item => {
      if(this.loginService.userType !== UserType.ADMIN){
        this.loginService.errorMessage = "Admin Privileges required."
        this.loginService.showLogin();
      }
    });
  }

  onSubmit(form: any): void{
    if(form.valid){
      if(this.selectedUserType === UserType.CUSTOMER){
        const customer: Customer = new Customer(this.valueStorage.firstName, this.valueStorage.lastName,
                                                this.valueStorage.address,
                                                this.valueStorage.birthday, this.valueStorage.email,
                                                this.valueStorage.phone, this.valueStorage.password,
                                                UserType.CUSTOMER);
        this.userService.createCustomer(customer).subscribe(
          response => this.handleCreation(response, form),
          error => this.handleError(error)
        );
      } else if(this.selectedUserType === UserType.ADMIN){
        const admin: Admin = new Admin(this.valueStorage.firstName, this.valueStorage.lastName,
                                        this.valueStorage.address, this.valueStorage.birthday,
                                        this.valueStorage.email, this.valueStorage.phone,
                                        this.valueStorage.password, UserType.ADMIN,
                                        this.valueStorage.adminRole);
        this.userService.createAdmin(admin).subscribe(
          response => this.handleCreation(response, form),
          error => this.handleError(error)
        );
      } else if(this.selectedUserType === UserType.ORDER_PROCESSOR) {
        const processor: OrderProcessor = new OrderProcessor(this.valueStorage.firstName, this.valueStorage.lastName,
                                                            this.valueStorage.address, this.valueStorage.birthday,
                                                            this.valueStorage.email, this.valueStorage.phone,
                                                            this.valueStorage.password, UserType.ORDER_PROCESSOR,
                                                            this.valueStorage.processingArea,
                                                            this.valueStorage.shift);
        this.userService.createOrderProcessor(processor).subscribe(
          response => this.handleCreation(response, form),
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
  toPageBlank(nav: string){
    this.router.navigate([nav]);
  }

  private handleCreation(response: any, form: any): void {
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
    Object.values(form.controls).forEach((control: any) => {
      control.markAsUntouched();
    });
    this.valueStorage.feedbackMessage = "User successfully created!"
  }
  private handleError(error: any): void {
    console.error("Error creating user", error);
    this.valueStorage.feedbackMessage = "Error creating user."
  }

  protected readonly UserType = UserType;
}
