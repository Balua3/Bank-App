import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent
    //      4200 login
  },
  {
    path:'dashboard',component:DashboardComponent
    //'' - 4200/dashboard - register
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'transaction',component:TransactionComponent
  }
  // {
  //   path:'delete',component:DeleteComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
