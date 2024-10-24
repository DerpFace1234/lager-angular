import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent{
  user: User = new User('', '', '', '', new Date(), '', '', '');
  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void{
    this.userService.createUser(this.user).subscribe(response =>{
      console.log("User created successfully", response);
      this.user = new User('', '', '', '', new Date(), '', '', '');
      this.userService.triggerRefreshUserList();
    }, error => {
      console.error("Error creating user", error);
    });
  }
}
