import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';


import { Router, ActivatedRoute } from '@angular/router';
import { OrderModel, ItemModel } from '@app/@shared/orders.model';
import { ItemsService } from '@app/@shared/items.service';
import { OrdersService } from '@app/@shared/order.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  id: number
  order: OrderModel
  error = false

  orderItems: ItemModel[] = []
  displayedColumns: string[] = [ 'name', 'quantity'];
  dataSource: MatTableDataSource<ItemModel>;


  constructor(
    public itemsService: ItemsService,
    public ordersService: OrdersService,
    //public authService: AuthenticationService,
    public route: ActivatedRoute
) { }

  ngOnInit() {
    
    this.route.params.subscribe(params=>
      {
          this.id = parseInt(params.id)
          console.log(this.id);
          if(!this.id)
          {
            console.log('Invalid Order Id')
          }
          else
          {
            this.fetchOrder()
          }
      })

  }

  fetchOrder()
  {
    console.log('Fetching Order Details of: '+this.id)
    this.order = this.ordersService.getOrder(this.id)

    this.fetchOrderItems()
  }

  fetchOrderItems()
  {
    this.order.details.forEach(orderDetail=>{
      console.log('Fetching Item: '+orderDetail.itemId)
      let item=this.itemsService.getItem(orderDetail.itemId)

      if(item)
      {
        this.orderItems.push(item)
      }
    })
this.initializeDataGrid();
  }
  
  initializeDataGrid()
  {
    this.dataSource = new MatTableDataSource<ItemModel>(this.orderItems)
  }



}
