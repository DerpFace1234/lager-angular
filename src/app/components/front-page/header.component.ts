import {ChangeDetectorRef, Component} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {ShoppingService} from '../../services/shopping.service';
import {Components, ComponentType, StorageInterface} from '../../model/component.model';
import {UserType} from '../../model/user.model';

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

  constructor(public loginService: LoginService, private router: Router, public shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.loginService.checkSession().subscribe(
      (auth: boolean) => {
        this.loginService.userPresent = auth;
        this.loginService.getUser().subscribe(data => {
          this.loginService.userType = data.type;
        });
      },
      (error) => {
        console.error('Error during checkSession:', error);
        this.loginService.userType = null;
        this.loginService.userPresent = false;
      }
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
    this.router.navigate([nav]);
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
        this.loginService.userType = null;
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
  protected readonly UserType = UserType;
}
