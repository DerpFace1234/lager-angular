import {ChangeDetectorRef, Component} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {ShoppingService} from '../../services/shopping.service';
import {ComponentType, StorageInterface} from '../../model/component.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private subscriptions: Subscription = new Subscription();
  private timer: any;
  public isPanelVisible: boolean = false;
  public isBottomPanelVisible = false;

  constructor(private loginService: LoginService, private router: Router, public shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.loginService.checkSession().subscribe(
      (auth: boolean) => (this.loginService.userPresent = auth),
      (error) => console.error('Error during checkSession:', error)
    );
    this.shoppingService.cart=this.shoppingService.getComponentFromLS("cart") || [];
    this.shoppingService.triggerRefresh();

    this.subscriptions.add(
      this.loginService.refreshLogin$.subscribe(() => {
        this.loginService.checkSession().subscribe(
          (auth: boolean) => (this.loginService.userPresent = auth),
          (error) => console.error('Error during refreshLogin check:', error)
        );
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  clearCart(): void{
    this.shoppingService.cart = [];
    this.shoppingService.triggerRefresh();
  }
  toPage(nav: string){
    this.router.navigate([nav]).then(() => {
      location.reload()
    });
  }
  toPagePicker(nav: string, type:string, variant:string){
    this.router.navigate([nav, type, variant]).then(() => {location.reload()});
  }
  openLogin() {
    this.loginService.showLogin();
  }
  logout() {
    this.loginService.logout().subscribe(
      () => {
        console.log('Logged out successfully');
        this.loginService.userPresent = false;
        this.toPage('');
      },
      (error) => console.error('Error during logout:', error)
    );
  }

  onHoverPanel(): void {
    this.isPanelVisible = true;
  }
  onHoverLeave(): void {
    this.timer = setTimeout(() => {
      this.isPanelVisible = false;
    }, 200);
  }
  onWrapperHover(): void {
    this.isBottomPanelVisible = true;
  }
  onWrapperLeave(): void {
    setTimeout(() => {
      this.isBottomPanelVisible = false;
    }, 200);
  }

  isUserPresent(): boolean{
    return this.loginService.userPresent;
  }

  protected readonly ComponentType = ComponentType;
  protected readonly StorageInterface = StorageInterface;
}
