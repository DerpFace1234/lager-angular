import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoginService} from '../../../services/login.service';
import {Admin, Customer, OrderProcessor, UserType} from '../../../model/user.model';
import {waitForAsync} from '@angular/core/testing';
import {Router} from '@angular/router';
import {Order} from '../../../model/order.model';
import {OrderService} from '../../../services/order.service';
import {UserService} from '../../../services/user.service';
import {OrderMiddleman} from '../../../model/orderMiddleman.model';
import {ComponentsService} from '../../../services/components.service';
import {Components} from '../../../model/component.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  customer: Customer | null = null;
  admin: Admin | null = null;
  orderProcessor: OrderProcessor | null = null;
  orders: Order[] | null = null
  ordersPersonal: Order[] | null = null
  activeOrder: Order | null = null;
  feedbackMessage: string = ""
  birthday: string = ""
  statusStrings: string[] = ["PENDING", "SHIPPED", "DELIVERED", "CANCELED"];
  constructor(public loginService: LoginService, private router: Router, public orderService: OrderService,
              private userService: UserService, private componentsService: ComponentsService) {}
  details: boolean = false;
  order: boolean = true;
  orderPersonal: boolean = true;
  orderActive: boolean = false;
  activeOrderNumber: number | undefined | null = null;
  numbers: number = 0;


  ngOnInit(): void {
    this.loginService.handleStuff().then(item => {
      if (this.loginService.userPresent) {
        this.loginService.getUser().subscribe(data => {
          if (this.loginService.userType === UserType.CUSTOMER) {
            this.customer = data as Customer;
            this.birthday = new Date(this.customer.birthday).toISOString().split('T')[0]
            this.flip('order-one', 0);
          } else if (this.loginService.userType === UserType.ADMIN) {
            this.admin = data as Admin;
            this.birthday = new Date(this.admin.birthday).toISOString().split('T')[0]
            this.flip('details', 0);
          } else if (data.type === UserType.ORDER_PROCESSOR) {
            this.orderProcessor = data as OrderProcessor;
            this.birthday = new Date(this.orderProcessor.birthday).toISOString().split('T')[0]
            this.flip('order-personal', 0);
          } else {
            this.loginService.errorMessage = 'Login required.';
            this.loginService.showLogin();
          }
        })
      }
    });
  }

  saveChanges(): void{
    if(this.customer){
      this.customer.birthday = new Date(this.birthday);
      this.userService.updateCustomer(this.customer.id, this.customer).subscribe(
        response => {
          this.userService.triggerRefreshUserList();
          this.feedbackMessage = "Changes successfully saved.";
        }, error => this.feedbackMessage = "Error saving changes."
      )
    } else if(this.admin){
      this.admin.birthday = new Date(this.birthday);
      this.userService.updateAdmin(this.admin.id, this.admin).subscribe(
        response => {
          this.userService.triggerRefreshUserList();
          this.feedbackMessage = "Changes successfully saved.";
        }, error => this.feedbackMessage = "Error saving changes."
      )
    } else if(this.orderProcessor){
      this.orderProcessor.birthday = new Date(this.birthday);
      this.userService.updateOrderProcessor(this.orderProcessor.id, this.orderProcessor).subscribe(
        response => {
          this.userService.triggerRefreshUserList();
          this.feedbackMessage = "Changes successfully saved.";
        }, error => this.feedbackMessage = "Error saving changes."
      )
    }

  }

  getOrders(type:string): void{
    if(this.customer && type !== 'order-single'){
      this.orderService.getOrdersOfCustomer(this.customer.id).subscribe(data => {
        data.sort((a, b) => {
          return new Date(a.orderDateTime).getTime() + new Date(b.orderDateTime).getTime();
        });
        this.orders = [];
        this.orders = data as Order[];
      })
    } else if(!this.customer && type === 'order-all'){
      this.orderService.getAllOrders().subscribe(data => {
        data.sort((a, b) => {return new Date(a.orderDateTime).getTime() + new Date(b.orderDateTime).getTime();});
        this.orders = [];
        this.orders = data as Order[];
      })
    } else if(this.orderProcessor && type === 'order-personal'){
      this.orderService.getOrdersOfProcessor(this.orderProcessor.id).subscribe(data => {
        data.sort((a, b) => {
          return new Date(a.orderDateTime).getTime() + new Date(b.orderDateTime).getTime();
        });
        this.orders = [];
        this.ordersPersonal = data as Order[];
      })
      this.orderService.getAllOrders().subscribe(data => {
        data.sort((a, b) => {return new Date(a.orderDateTime).getTime() - new Date(b.orderDateTime).getTime();});
        this.orders = [];
        this.orders = data as Order[];
      })
    } else if(type === 'order-single' && this.activeOrderNumber){
      console.log("finding orders")
      this.findOrder();
    }
  }

  public async findOrder(): Promise<void> {
    if(this.activeOrderNumber){
      let middleMan: OrderMiddleman | null = await this.orderService.getOrderById(this.activeOrderNumber).toPromise() ?? null;
      if(middleMan){
        let customer: Customer | null = await this.userService.getCustomerById(middleMan.customerId).toPromise() ?? null;
        let processor: OrderProcessor | null = await this.userService.getOrderProcessorById(middleMan.processorId).toPromise() ?? null;
        if(customer && processor){
          let newMap: Map<Components, number> = new Map();
          for(let entry of Object.entries(middleMan.components)){
            let a = await this.componentsService.getComponentById(Number(entry[0])).toPromise() ?? null;
            if(a) {
              newMap.set(a, entry[1]);
            }
          }
          let f = new Order(middleMan.orderDateTime, customer, middleMan.status, newMap, middleMan.price, processor)
          f.id = this.activeOrderNumber;
          console.log(f)
          this.activeOrder = f;
          this.calcNumberOfComponents(f);
        }
      }
    }
  }

  updateStatus(id: number | undefined, status:string): void{
    this.orderService.updateStatus(id, status).subscribe(() => {})
  }
  calcNumberOfComponents(order: Order): number{
    let numberOfComponents: number = 0;
    if (order && order.components) {
      for (const value of Object.values(order.components)) {
        numberOfComponents += value as number;
      }
    }
    this.numbers = numberOfComponents;

    return numberOfComponents;
  }
  flip(b: string, id:number | undefined): void{
    switch (b){
      case("details"):
        this.order = false
        this.details = true
        this.orderActive = false
        this.orderPersonal = false
        this.orders = []
        this.activeOrder = null;
        break
      case("order-one"):
        this.order = true
        this.details = false
        this.orderActive = false
        this.orderPersonal = false
        this.activeOrder = null;
        this.getOrders(b);
        break
      case("order-personal"):
        this.order = false
        this.details = false
        this.orderActive = false
        this.orderPersonal = true
        this.activeOrder = null;
        this.getOrders(b);
        break
      case("order-all"):
        this.order = true
        this.details = false
        this.orderActive = false;
        this.orderPersonal = false
        this.activeOrder = null;
        this.getOrders(b);
        break
      case("order-single"):
        this.activeOrderNumber = id;
        this.order = false
        this.details = false
        this.orderActive = true;
        this.orderPersonal = false
        this.orders = [];
        this.activeOrder = null;
        this.getOrders(b);
    }
  }
  toPage(page: string): void{
    this.router.navigateByUrl(page);
  }

  protected readonly UserType = UserType;
  protected readonly Object = Object;
}
