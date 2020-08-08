import { Injectable } from '@angular/core';
import { OrderModel } from './orders.model';
import { Orders } from '@app/mockdata';



@Injectable({providedIn: "root"})
export class OrdersService
{
    constructor()
    {
        
    }

getAllOrders():OrderModel[]
    {
        return Orders
    }

    getOrder(id: number): OrderModel
    {
        return Orders.filter(order=>order.id==id)[0]
    }
}