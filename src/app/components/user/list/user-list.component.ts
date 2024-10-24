import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    users: User[] = [];
    searchQuery: string = "";
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
      this.loadUsers()

      this.userService.refreshUserList$.subscribe(() => {
        this.loadUsers();
      });
    }

    loadUsers() {
      this.userService.getUsers().subscribe((data: User[]) => {
        this.users = data;
      }, (error) => {
        console.error('Failed to fetch users:', error);
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
}
