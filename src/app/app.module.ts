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
import {NgOptimizedImage} from "@angular/common";
import {LoginComponent} from './components/user/login/login.component';
import {DashboardComponent} from './components/user/dashboard/dashboard.component';
import {HeaderComponent} from './components/front-page/header.component';
import {AuthInterceptor} from './components/auth/auth.component.auth-inceptor';
import {CreateComponentsComponent} from './components/component/create/create-components.component';
import {ConfigurerComponent} from './components/component/configurer/configurer.component';
import {ListComponentsComponent} from './components/component/list/list-components.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DetailsComponent} from './components/user/edit/details.component';
import {EditCompComponent} from './components/component/edit/edit-comp.component';
import {PickerComponent} from './components/component/picker/picker.component';
import {SecondPageComponent} from './components/second-page/second-page.component';
import {CheckoutComponent} from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CreateUserComponent,
    FrontPageComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    CreateComponentsComponent,
    ConfigurerComponent,
    ListComponentsComponent,
    DetailsComponent,
    EditCompComponent,
    PickerComponent,
    SecondPageComponent,
    CheckoutComponent,
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
    BrowserAnimationsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
