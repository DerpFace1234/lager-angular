import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Components} from '../model/component.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private apiUrl = 'http://localhost:8080/api/public/components';
  public cart: Components[] = [];
  public total: number = 0.00;
  private refreshShoppingListSource = new Subject<void>();
  refreshShoppingList$ = this.refreshShoppingListSource.asObservable();
  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this.refreshShoppingListSource.next();
    this.total = 0.00;
    for(let i=0; i<this.cart.length; i++){
      this.total += this.cart[i].price*this.cart[i].orderedQuantity;
    }
    this.storeComponentInLS("cart", this.cart);
  }
  removeFromCart(i:number){
    this.cart = this.cart.filter((_, index) => {
      if(index === i){
        if(this.cart[i].orderedQuantity > 1){
          this.cart[i].orderedQuantity -= 1;
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }) ?? this.cart;
    this.triggerRefresh();
  }
  addToCart(comp: Components): void {
    const i = this.cart.findIndex(item => item.id === comp.id)
    if(i !== -1){
      this.cart[i].orderedQuantity += 1
    } else {
      this.cart.push(comp);
    }
    this.triggerRefresh();
  }

  storeComponentInLS(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getComponentFromLS<T>(key: string): T | null {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) as T : null;
  }
}
