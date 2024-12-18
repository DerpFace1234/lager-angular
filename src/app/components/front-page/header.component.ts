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

  private subscriptions: Subscription = new Subscription();
  private timer: any;
  public isPanelVisible: boolean = false;
  public isBottomPanelVisible = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.checkSession().subscribe(
      (auth: boolean) => (this.loginService.userPresent = auth),
      (error) => console.error('Error during checkSession:', error)
    );

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

  toPage(nav: string){
    this.router.navigate([nav]);
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
}
