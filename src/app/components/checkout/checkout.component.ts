import {Component} from '@angular/core';
import {ShoppingService} from '../../services/shopping.service';
import {Router} from '@angular/router';
import { Order } from '../../model/order.model';
import {LoginService} from '../../services/login.service';
import {Admin, Customer, OrderProcessor, UserType} from '../../model/user.model';
import {UserService} from '../../services/user.service';
import {OrderService} from '../../services/order.service';
import {Components} from '../../model/component.model';
import {OrderMiddleman} from '../../model/orderMiddleman.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(public shoppingService: ShoppingService, private router: Router,
              public loginService: LoginService, public userService: UserService,
              public orderService: OrderService) {}
  orderSuccessful: boolean = false;
  orderFail: boolean = false;
  feedback: string = "Pick some Components and add them to your cart. They will be displayed here!";
  customer: Customer | null = null;
  processors: OrderProcessor | null = null;

  confirmOrder(): void{
    if(this.loginService.userPresent){
      this.loginService.getUser().subscribe((data) => {
        if(data.type === UserType.CUSTOMER) {
          this.customer = data as Customer;
        }
        if(this.customer){
          this.userService.getOrderProcessors().subscribe((data: OrderProcessor[]) => {
            this.processors = data[Math.floor(Math.random()*data.length)];
            if(this.processors && this.customer){
              let a: {[key: string]: number} = {};
              this.shoppingService.cart.forEach(item => {
                  if(item.id) {
                    a[item.id?.toString()] = item.orderedQuantity;
                  }
                });
              let order: OrderMiddleman = new OrderMiddleman(new Date(Date.now()), this.customer.id, "PENDING", a, this.shoppingService.total, this.processors.id);

              this.orderService.createOrder(order).subscribe(
                response => {
                  this.userService.triggerRefreshUserList();
                  this.orderSuccessful = true;
                  this.feedback = "Order successful";
                  this.clearCart();
                },
                error => {
                  console.error("Error creating order", error);
                  this.orderFail = true;
                  this.feedback = "Order failed";
                }
              );
            } else {
              this.feedback = "Error setting Order.";
              this.orderFail = true;
            }
          });
        } else {
          this.feedback = "Not a valid Customer.";
          this.orderFail = true;
        }
      });
    } else {
      this.loginService.showLogin();
    }
  }

  clearCart(): void{
    this.shoppingService.cart = [];
    this.shoppingService.triggerRefresh();
    //this.toPage('/configurer');
  }
  toPage(nav: string){
    this.router.navigate([nav]).then(() => {
      location.reload()
    });
  }
}
