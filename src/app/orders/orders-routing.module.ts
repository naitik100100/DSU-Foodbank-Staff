import { OrderDetailComponent } from './order-detail/order-detail.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { OrdersComponent } from './orders.component';
import { Shell } from '@app/shell/shell.service';
import { LoginComponent } from '@app/login/login.component';

const routes: Routes = [
  Shell.childRoutes([
    {path:'',component:LoginComponent},
    { path: 'orders', component: OrdersComponent, data: { title: extract('Orders') } },
    { path: 'orderdetail/:id', component: OrderDetailComponent, data: { title: extract('OrderDetail') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
