import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user/list/user-list.component';
import { CreateUserComponent } from './components/user/create/create-user.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { UserMngmtComponent } from './components/user/user-mngmt.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CreateUserComponent,
    UserMngmtComponent,
    FrontPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
