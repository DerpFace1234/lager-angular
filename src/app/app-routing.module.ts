import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { UserMngmtComponent } from './components/user/mngmt/user-mngmt.component';
import {LoginComponent} from './components/user/login/login.component';
import {DashboardComponent} from './components/user/dashboard/dashboard.component';
import {AuthGuard} from './components/auth/auth.guard';
import {ConfigurerComponent} from './components/configurer/configurer.component';
import {CreateComponentsComponent} from './components/component/upload/create-components.component';
import {ListComponentsComponent} from './components/component/list/list-components.component';
import {ComponentsMgtComponent} from './components/component/management/components-mgt.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'user-mngmt', component: UserMngmtComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'configurer', component: ConfigurerComponent },
  { path: 'component-mgt', component: ComponentsMgtComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
