import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule  // Import HttpClientModule for API communication
  ],
  providers: [],
  bootstrap: [AppComponent]  // Bootstrapping the main component
})
export class AppModule { }
