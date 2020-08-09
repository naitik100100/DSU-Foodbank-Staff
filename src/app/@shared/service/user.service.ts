import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({ providedIn: "root" })
export class UserService {
    constructor(
        public httpClient: HttpClient
    ) {

    }

    getUser(id: number): Observable<any> {
        return this.httpClient.get(`${this.getStaffUrl()}user/${id}`)
    }
    getStaffUrl() {
        return environment.staffUrl
    }
}