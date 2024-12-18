import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user/list/user-list.component';
import { CreateUserComponent } from './components/user/create/create-user.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { UserMngmtComponent } from './components/user/mngmt/user-mngmt.component';
import {NgOptimizedImage} from "@angular/common";
import {LoginComponent} from './components/user/login/login.component';
import {DashboardComponent} from './components/user/dashboard/dashboard.component';
import {HeaderComponent} from './components/front-page/header.component';
import {AuthInterceptor} from './components/auth/auth.component.auth-inceptor';
import {CreateComponentComponent} from './components/component/upload/create-component.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CreateUserComponent,
    UserMngmtComponent,
    FrontPageComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    CreateComponentComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        RouterOutlet,
        RouterLink,
        ReactiveFormsModule,
        NgOptimizedImage,
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
