import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user/user-list.component';
import { CreateUserComponent } from './components/user/create-user.component';
import { UserService } from './services/user.service';
import {RouterOutlet} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Import HttpClientModule for API communication
    FormsModule,
    RouterOutlet,
    // Import for Forms to createnew entries
  ],
  providers: [],
  bootstrap: [AppComponent]  // Bootstrapping the main component
})
export class AppModule { }
