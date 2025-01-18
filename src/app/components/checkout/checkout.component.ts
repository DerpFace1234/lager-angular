import {Component} from '@angular/core';
import {ShoppingService} from '../../services/shopping.service';
import {Router} from '@angular/router';
import { Order } from '../../model/order.model';
import {dateTimestampProvider} from 'rxjs/internal/scheduler/dateTimestampProvider';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(public shoppingService: ShoppingService, private router: Router) {}
  orderSuccessful: boolean = false;
  orderFail: boolean = false;
  feedback: string = "Pick some Components and add them to your cart. They will be displayed here!";

  //get user by id
  //when placing order, add order to user
  //get all processors
  //assign processor randomly on confirmOrder

  confirmOrder(): void{
    //let order: Order = new Order(new Date(Date.now()), null, "PENDING", this.shoppingService.cart, this.shoppingService.total, null);
  }

  clearCart(): void{
    this.shoppingService.cart = [];
    this.shoppingService.triggerRefresh();
    this.toPage('/configurer');
  }
  toPage(nav: string){
    this.router.navigate([nav]).then(() => {
      location.reload()
    });
  }
}
