import { Injectable } from "@angular/core";

import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Items } from '@app/mockdata';
import { ItemModel } from '../model/orders.model';

@Injectable({providedIn: 'root'})
export class ItemsService
{
    constructor
    (
        public httpClient: HttpClient
    )
    {

    }
    getAllItems(): Observable<any>
    {
        //return Items
       return this.httpClient.get(`${this.getUrl()}items`)
    }

    getItem(id:number): Observable<any>
    {
        return this.httpClient.get(`${this.getUrl()}items/${id}`)
        //return Items.filter((item: { id: number; }) => item.id==id)[0]
    }

    getUrl()
    {
        return environment.supplierUrl;
    }
}
