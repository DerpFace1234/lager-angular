import {Component} from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
import {Admin, Customer, OrderProcessor, UserType} from '../../../model/user.model';
import {UserService} from '../../../services/user.service';
import {LoginService} from '../../../services/login.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent{

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, public loginService: LoginService){}
  id!: number;
  editCustomer: any = null;
  editAdmin: any = null;
  editOrderProcessor: any = null;
  birthday: string = "";

  ngOnInit() {
    this.loginService.handleStuff().then(item => {
      if(this.loginService.userType !== UserType.ADMIN){
        this.loginService.errorMessage = "Admin Privileges required."
        this.loginService.showLogin();
      }
    });

    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadCustomerById(this.id);
    this.loadAdminById(this.id);
    this.loadOrderProcessorById(this.id);
  }

  loadCustomerById(id:number) {
    this.userService.getCustomerById(id).subscribe((data: Customer) => {
      this.editCustomer = data;
      this.birthday = new Date(data.birthday).toISOString().split('T')[0];
    }, (error) => {
      console.error('Failed to fetch customer:', error);
    });
  }
  loadAdminById(id:number) {
    this.userService.getAdminById(id).subscribe((data: Admin) => {
      this.editAdmin = data;
      this.birthday = new Date(data.birthday).toISOString().split('T')[0];
    }, (error) => {
      console.error('Failed to fetch admin:', error);
    });
  }
  loadOrderProcessorById(id:number) {
    this.userService.getOrderProcessorById(id).subscribe((data: OrderProcessor) => {
      this.editOrderProcessor = data;
      this.birthday = new Date(data.birthday).toISOString().split('T')[0];
    }, (error) => {
      console.error('Failed to fetch OrderProcessor:', error);
    });
  }

  saveChanges(type: UserType){
    if(type === UserType.CUSTOMER){
      this.editCustomer.birthday = new Date(this.birthday);
      this.userService.updateCustomer(this.editCustomer.id, this.editCustomer).subscribe(
        response => this.userService.triggerRefreshUserList(),
        error => console.error("Error updating user", error)
      );
    } else if(type === UserType.ADMIN) {
      this.editAdmin.birthday = new Date(this.birthday);
      this.userService.updateAdmin(this.editAdmin.id, this.editAdmin).subscribe(
        response => this.userService.triggerRefreshUserList(),
        error => console.error("Error updating user", error)
      );
    } else if(type === UserType.ORDER_PROCESSOR) {
      this.editOrderProcessor.birthday = new Date(this.birthday);
      this.userService.updateOrderProcessor(this.editOrderProcessor.id, this.editOrderProcessor).subscribe(
        response => this.userService.triggerRefreshUserList(),
        error => console.error("Error updating user", error)
      );
    }
    this.closeOverlay();
  }
  closeOverlay(): void {
    this.toPage('/user-list');
  }
  toPage(nav: string){
    this.router.navigate([nav]);
  }

  protected readonly UserType = UserType;
}
