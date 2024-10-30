import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {Admin, OrderProcessor, User} from '../../../model/user.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    users: User[] = [];
    admins: Admin[] = [];
    processors: OrderProcessor[] = [];
    searchQuery: string = "";
    showCheckboxes: boolean = false;
    filters: {[key: string]: boolean} = {
      firstName: false,
      lastName: false,
      address: false,
      department: false,
      birthday: false,
      email: false,
      phone: false,
    }

    constructor(private userService: UserService) {}

    ngOnInit(): void {
      this.loadUsers();
      this.loadAdmins();
      this.loadOrderProcessors();

      this.userService.refreshUserList$.subscribe(() => {
        this.loadUsers();
        this.loadAdmins();
        this.loadOrderProcessors();
      });
    }

    loadUsers() {
      this.userService.getUsers().subscribe((data: User[]) => {
        this.users = data;
      }, (error) => {
        console.error('Failed to fetch users:', error);
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

    toggleCheckboxes(): void {
      this.showCheckboxes = !this.showCheckboxes;
    }

    deleteCheckedUsers(): void{
      this.users.forEach(user => {
        if (user.checked) {
          this.userService.deleteUser(user.id).subscribe(
            response => this.userService.triggerRefreshUserList(),
            error => console.error("Error deleting user", error)
          );
        }
      });
    }

    get filteredUsers(){
      return this.users.filter(user => {
        const query = this.searchQuery.toLowerCase();
        const fN = user.firstName.toLowerCase().includes(query);
        const lN = user.lastName.toLowerCase().includes(query);
        const a = user.address.toLowerCase().includes(query);
        const d = user.department.toLowerCase().includes(query);
        const bd = user.birthday.toString().includes(query);
        const e = user.email.toLowerCase().includes(query);
        const p = user.phone.toLowerCase().includes(query);
        const matchesFirstName = this.filters[0] && fN;
        const matchesLastName = this.filters[1] && lN;
        const matchesAddress = this.filters[2] && a;
        const matchesDepartment = this.filters[3] && d;
        const matchesBirthday = this.filters[4] && bd;
        const matchesEmail = this.filters[5] && e;
        const matchesPhone = this.filters[6] && p;

        return (
          (this.filters[0] || this.filters[1] || this.filters[2] || this.filters[3] || this.filters[4] || this.filters[5] || this.filters[6]) ?
            (matchesFirstName || matchesLastName || matchesAddress || matchesDepartment || matchesBirthday || matchesEmail || matchesPhone) :
            (fN || lN || a || d || bd || e || p)
        );
      })
    }

    get filteredAdmins(){
      const includeIds = new Set(this.filteredUsers.map(user => user.id))
      return this.admins.filter(admin => includeIds.has(admin.id))
    }

    get filteredOrderProcessors(){
      const includeIds = new Set(this.filteredUsers.map(user => user.id))
      return this.processors.filter(processors => includeIds.has(processors.id))
    }
}
