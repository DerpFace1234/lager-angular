import {Component} from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
import {Admin, Customer, OrderProcessor, UserType} from '../../../model/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent{

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService){}
  id!: number;
  editCustomer: any = null;
  editAdmin: any = null;
  editOrderProcessor: any = null;

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadCustomerById(this.id);
    this.loadAdminById(this.id);
    this.loadOrderProcessorById(this.id);
  }

  loadCustomerById(id:number) {
    this.userService.getCustomerById(id).subscribe((data: Customer) => {
      this.editCustomer = data;
    }, (error) => {
      console.error('Failed to fetch customer:', error);
    });
  }
  loadAdminById(id:number) {
    this.userService.getAdminById(id).subscribe((data: Admin) => {
      this.editAdmin = data;
    }, (error) => {
      console.error('Failed to fetch admin:', error);
    });
  }
  loadOrderProcessorById(id:number) {
    this.userService.getOrderProcessorById(id).subscribe((data: OrderProcessor) => {
      this.editOrderProcessor = data;
    }, (error) => {
      console.error('Failed to fetch OrderProcessor:', error);
    });
  }

  saveChanges(type: UserType){
    if(type === UserType.CUSTOMER){
      this.userService.updateCustomer(this.editCustomer.id, this.editCustomer).subscribe(
        response => this.userService.triggerRefreshUserList(),
        error => console.error("Error updating user", error)
      );
    } else if(type === UserType.ADMIN) {
      this.userService.updateAdmin(this.editAdmin.id, this.editAdmin).subscribe(
        response => this.userService.triggerRefreshUserList(),
        error => console.error("Error updating user", error)
      );
    } else if(type === UserType.ORDER_PROCESSOR) {
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
