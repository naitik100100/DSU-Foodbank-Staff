import { OrdersModule } from '../../orders/orders.module';

import { Injectable } from '@angular/core';
import { OrderModel } from '../model/orders.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';



@Injectable({ providedIn: "root" })
export class OrdersService {
    formData : OrderModel
    constructor(
        public httpClient: HttpClient
    ) {

    }

    getAllOrders(): Observable<any> 
    {
       // let bannerId = localStorage.getItem('bannerId')
        return this.httpClient.get(`${this.getStaffUrl()}orders`)

    }

    getOrder(id: number): Observable<any> 
    {
        //return Orders.filter(order => order.id == id)[0]
        return this.httpClient.get(`${this.getStaffUrl()}orders/${id}`)
    }

    updateOrderStatus(id: number, status: string): Observable<any>
    {
        return this.httpClient.put(`${this.getStaffUrl()}orders`, { id: id,orderstatus : status } )
    }


    getSupplierUrl() {
        return environment.supplierUrl
    }
    getStaffUrl() {
        return environment.staffUrl
    }

}