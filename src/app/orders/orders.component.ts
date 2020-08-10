
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { OrderModel } from '@app/@shared/model/orders.model';
import { OrdersService } from '@app/@shared/service/order.service';
import { Router } from '@angular/router';
import { AuthService } from '@app/@shared/service/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  _orders: OrderModel[] = [];
  columns: string[] = ['Id', 'BannerId', 'Ordered Date', 'PickUp Date', 'Order Status', 'View'];
  index = ['id', 'bannerId', 'orderedDate', 'pickUpDate', 'orderstatus'];


  quote: string | undefined;
  isLoading = false;

  constructor(public ordersService: OrdersService,public router: Router,public auth:AuthService) { }

  ngOnInit() {
    console.log(localStorage.getItem('id'))
      if(localStorage.getItem('id')==null){
      this.router.navigate(['/login']);
      }
      this.getOrders();
  }

  getOrders(){
    // this._orders = this.ordersService.getAllOrders();
    this.ordersService.getAllOrders().subscribe((data:OrderModel)=>{
        console.log(data);
        this._orders = data['Items']
        console.log(this._orders)
    })

    //console.log(this._orders);
  }

  viewOrder(id: number)
  {
    console.log(id);
    this.router.navigate([`/orderdetail/${id}`])
  }


}
