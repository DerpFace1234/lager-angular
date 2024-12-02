import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { UserMngmtComponent } from './components/user/mngmt/user-mngmt.component';
import {LoginComponent} from './components/user/login/login.component';
import {DashboardComponent} from './components/user/dashboard/dashboard.component';
import {AuthGuard} from './components/auth/auth.guard';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'user-mngmt', component: UserMngmtComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
