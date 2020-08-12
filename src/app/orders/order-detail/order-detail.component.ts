import { OrderDetailModel } from './../../@shared/model/orders.model';

import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@shared/mat-dialog-wrapper/mat-dialog-wrapper.component';



import { Router, ActivatedRoute } from '@angular/router';
import { OrderModel, ItemModel } from '@app/@shared/model/orders.model';
import { ItemsService } from '@app/@shared/service/items.service';
import { OrdersService } from '@app/@shared/service/order.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  id: number
  order: OrderModel
  orderdetails : OrderDetailModel[]
  error = false
  selected: string

  orderItems: ItemModel[] = []
  displayedColumns: string[] = ['name', 'quantity'];
  dataSource: MatTableDataSource<OrderDetailModel>;

  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };

  constructor(
    public itemsService: ItemsService,
    public ordersService: OrdersService,
    //public authService: AuthenticationService,
    public route: ActivatedRoute,
    private _matDialog: MatDialog,
    public router: Router
  ) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = parseInt(params.id)
      console.log(this.id);
      if (!this.id) {
        console.log('Invalid Order Id')
      }
      else {
        this.fetchOrder()
      }
    })


  }

  fetchOrder() {
    console.log('Fetching Order Details of: ' + this.id)
    this.ordersService.getOrder(this.id).subscribe((data: any) => {
      this.order = data['Item']
      this.orderdetails = this.order.details
      this.initializeDataGrid(this.orderdetails)
      console.log('fetched order', this.order)
    })
  }

  updateOrderStatus(status: string) {
    console.log(status);
    this.ordersService.updateOrderStatus(this.id, status).subscribe((res)=>{
      const dialogConfig = this._matDialogConfig;
            dialogConfig.data = { header: 'Success!', content: 'Status Updated successfully.' };
            this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
            this.router.navigateByUrl('/orders');
      console.log('success')
    });
  
  
}

initializeDataGrid(orderItems: OrderDetailModel[])
{
  this.dataSource = new MatTableDataSource<OrderDetailModel>(orderItems)
}



}
