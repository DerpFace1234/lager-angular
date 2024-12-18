import {Component, ComponentRef, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Admin, Customer, OrderProcessor, User, UserType} from '../../../model/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  customers: Customer[] = [];
  admins: Admin[] = [];
  processors: OrderProcessor[] = [];
  searchQuery: string = "";
  filters: {[key: string]: boolean} = {
    firstName: false,
    lastName: false,
    address: false,
    birthday: false,
    email: false,
    phone: false,
    displayCustomers: true,
    displayAdmins: true,
    displayOrderProcessors: true,
  }

  showDeleteOverlay: boolean = false;
  showOverlayCustomer: boolean = false;
  showOverlayAdmin: boolean = false;
  showOverlayProcessor: boolean = false;
  private subscriptions: Subscription = new Subscription();
  editCustomer: Customer = new Customer("", "", "", new Date(), "", "", "", UserType.CUSTOMER, []);
  editAdmin: Admin = new Admin("", "", "", new Date(), "", "", "", UserType.ADMIN, "");
  editOrderProcessor: OrderProcessor = new OrderProcessor("", "", "", new Date(), "", "", "", UserType.ORDER_PROCESSOR, [], [], "", "");
  protected readonly UserType = UserType;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadAdmins();
    this.loadOrderProcessors();

    this.subscriptions.add(
      this.userService.refreshUserList$.subscribe(() => {
        this.loadCustomers();
        this.loadAdmins();
        this.loadOrderProcessors();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadCustomers() {
    this.userService.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    }, (error) => {
      console.error('Failed to fetch customers:', error);
    });
  }

  loadAdmins() {
    this.userService.getAdmins().subscribe((data: Admin[]) => {
      this.admins = data;
    }, (error) => {
      console.error('Failed to fetch admins:', error);
    });
  }

  loadOrderProcessors() {
    this.userService.getOrderProcessors().subscribe((data: OrderProcessor[]) => {
      this.processors = data;
    }, (error) => {
      console.error('Failed to fetch order procesors:', error);
    });
  }

  @HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const scrollAmount = 100;

    if (this.scrollContainer) {
      if (event.key === 'ArrowDown') {
        this.scrollContainer.nativeElement.scrollBy({
          top: scrollAmount,
          behavior: 'smooth'
        });
      } else if (event.key === 'ArrowUp') {
        this.scrollContainer.nativeElement.scrollBy({
          top: -scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  }

  openDeleteOverlay(){
    this.showDeleteOverlay = true;
  }

  deleteUser(id: number | undefined){
    this.userService.deleteUser(id).subscribe(
      response => this.userService.triggerRefreshUserList(),
      error => console.error("Error deleting user", error)
    );
    this.closeOverlay()
  }

  openEditCustomer(user: Customer){
    this.editCustomer = {...user};
    this.showOverlayCustomer = true;
  }

  openEditAdmin(user: Admin){
    this.editAdmin = {...user};
    this.showOverlayAdmin = true;
  }

  openEditProcessor(user: OrderProcessor){
    this.editOrderProcessor = {...user};
    this.showOverlayProcessor = true;
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

  closeOverlay() {
    this.showDeleteOverlay = false;
    this.showOverlayCustomer = false;
    this.showOverlayAdmin = false;
    this.showOverlayProcessor = false;
  }

  get filteredCustomers(){
    if(this.filters['displayCustomers']){
      return this.filteredUsers(this.customers);
    } else {
      return []
    }
  }

  get filteredAdmins(){
    if(this.filters['displayAdmins']){
      return this.filteredUsers(this.admins);
    } else {
      return []
    }
  }

  get filteredProcessors(){
    if(this.filters['displayOrderProcessors']){
      return this.filteredUsers(this.processors);
    } else {
      return []
    }
  }

  filteredUsers<T extends User>(users: T[]): T[]{
    return users.filter(user => {
      const query = this.searchQuery.toLowerCase();
      const fN = user.firstName.toLowerCase().includes(query);
      const lN = user.lastName.toLowerCase().includes(query);
      const a = user.address.toLowerCase().includes(query);
      const bd = user.birthday.toString().includes(query);
      const e = user.email.toLowerCase().includes(query);
      const p = user.phone.toLowerCase().includes(query);
      const matchesFirstName = this.filters['firstName'] && fN;
      const matchesLastName = this.filters['lastName'] && lN;
      const matchesAddress = this.filters['address'] && a;
      const matchesBirthday = this.filters['birthday'] && bd;
      const matchesEmail = this.filters['email'] && e;
      const matchesPhone = this.filters['phone'] && p;

      return (
        (this.filters['firstName'] || this.filters['lastName'] || this.filters['address'] || this.filters['birthday'] || this.filters['email'] || this.filters['phone']) ?
          (matchesFirstName || matchesLastName || matchesAddress || matchesBirthday || matchesEmail || matchesPhone) :
          (fN || lN || a || bd || e || p)
      );
    })
  }

}
