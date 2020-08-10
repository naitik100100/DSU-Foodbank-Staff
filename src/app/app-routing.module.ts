import { OrdersModule } from './orders/orders.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
