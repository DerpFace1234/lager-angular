import {ChangeDetectorRef, Component} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public userPresent: boolean = false;
  private subscriptions: Subscription = new Subscription();
  private timer: any;
  public isPanelVisible: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.checkUserPresence();
    this.subscriptions.add(
      this.loginService.refreshLogin$.subscribe(() => {
        this.checkUserPresence();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toPage(nav: string){
    this.router.navigate([nav]);
  }

  private checkUserPresence(): void {
    this.userPresent = !!(
      sessionStorage.getItem('customer') ||
      sessionStorage.getItem('admin') ||
      sessionStorage.getItem('orderProcessor')
    );
  }

  openLogin() {
    this.loginService.showLogin();
  }

  logout(){
    this.loginService.logout();
    this.toPage('');
  }

  onHoverPanel(): void {
    this.isPanelVisible = true;
  }

  onHoverLeave(): void {
    this.timer = setTimeout(() => {
      this.isPanelVisible = false;
    }, 200);
  }
}
