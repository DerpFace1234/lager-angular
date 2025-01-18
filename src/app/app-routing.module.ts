import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import {LoginComponent} from './components/user/login/login.component';
import {DashboardComponent} from './components/user/dashboard/dashboard.component';
import {ConfigurerComponent} from './components/component/configurer/configurer.component';
import {DetailsComponent} from './components/user/edit/details.component';
import {CreateUserComponent} from './components/user/create/create-user.component';
import {UserListComponent} from './components/user/list/user-list.component';
import {EditCompComponent} from './components/component/edit/edit-comp.component';
import {CreateComponentsComponent} from './components/component/create/create-components.component';
import {ListComponentsComponent} from './components/component/list/list-components.component';
import {PickerComponent} from './components/component/picker/picker.component';
import {SecondPageComponent} from './components/second-page/second-page.component';
import {CheckoutComponent} from './components/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'user-create', component: CreateUserComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'edit-user/:id', component: DetailsComponent },
  { path: 'comp-create', component: CreateComponentsComponent },
  { path: 'comp-list', component: ListComponentsComponent },
  { path: 'edit-comp/:id', component: EditCompComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'configurer', component: ConfigurerComponent },
  { path: 'picker/:type/:variant', component: PickerComponent },
  { path: 'all', component: SecondPageComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
