import { Routes } from '@angular/router';
import { SignupComponent } from './basic/signup/signup.component';
import { LoginComponent } from './basic/login/login.component';
import { HomeComponent } from './basic/home/home.component';

export const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: SignupComponent},
  {path:'login', component: LoginComponent},
    { path: "admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule) },
  { path: "customer", loadChildren: () => import("./customer/customer.module").then(m => m.CustomerModule) }
];
