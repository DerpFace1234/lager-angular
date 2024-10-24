import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component'; // Import your new component
import { UserMngmtComponent } from './components/user/user-mngmt.component'; // The page you want to navigate to

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'user-mngmt', component: UserMngmtComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
