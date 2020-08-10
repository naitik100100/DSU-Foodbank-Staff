
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
  error = false
  selected: string

  orderItems: ItemModel[] = []
  displayedColumns: string[] = ['name', 'quantity'];
  dataSource: MatTableDataSource<ItemModel>;

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
    this.ordersService.getOrder(this.id).subscribe((data: OrderModel) => {
      this.order = data['Item']
      console.log('fetched order', this.order)
      this.fetchOrderItems()
    })
  }

  fetchOrderItems() {

    if(this.order.details.length == 0){
      console.log("No items for this order")
    }
else{
    this.order.details.forEach(orderDetail => {
      this.itemsService.getItem(orderDetail.id).subscribe((data: any) => {
        if(data.Item == undefined){
          console.log('No item found')
          //alert('No Item Found for this order')
        }else{

      
        console.log('item fetched:', data.Item)
        this.orderItems.push(data.Item)
        this.initializeDataGrid()
      }
      })
    })
  }
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

initializeDataGrid()
{
  this.dataSource = new MatTableDataSource<ItemModel>(this.orderItems)
}



}
