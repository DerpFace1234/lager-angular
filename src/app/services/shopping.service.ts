import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Components} from '../model/component.model';
import {Subject} from 'rxjs';

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
      this.total += this.cart[i].price;
    }
    this.storeComponentInLS("cart", this.cart);
  }
  removeFromCart(i:number){
    this.cart = this.cart.filter((_, index) => index !== i) ?? this.cart;
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
