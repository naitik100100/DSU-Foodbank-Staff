import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { OrderModel } from '@app/@shared/orders.model';
import { OrdersService } from '@app/@shared/order.service';
import { Router } from '@angular/router';

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

  constructor(public ordersService: OrdersService,public router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.getOrders();
    
  }

  getOrders(){
    this._orders = this.ordersService.getAllOrders();
    console.log(this._orders);
  }

  viewOrder(id: number)
  {
    console.log(id);
    this.router.navigate([`/orderdetail/${id}`])
  }


}
