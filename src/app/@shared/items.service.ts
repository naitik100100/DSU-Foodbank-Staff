import { Injectable } from "@angular/core";

import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Items } from '@app/mockdata';
import { ItemModel } from './orders.model';

@Injectable({providedIn: 'root'})
export class ItemsService
{
    constructor
    (
        public httpClient: HttpClient
    )
    {

    }
    getAllItems(): ItemModel[]
    {
        return Items
       // return this.httpClient.get(`${this.getUrl()}items`)
    }

    getItem(id:number): ItemModel
    {
        return Items.filter((item: { id: number; }) => item.id==id)[0]
    }

    // getUrl()
    // {
    //     return environment.supplierUrl;
    // }
}
