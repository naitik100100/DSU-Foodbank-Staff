import { UserModel } from './../model/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '../mat-dialog-wrapper/mat-dialog-wrapper.component';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isUserLoggedIn: BehaviorSubject<boolean>;
    user: UserModel

    private _matDialogConfig: MatDialogConfig = {
        minWidth: '250px',
        minHeight: '200px',
      };
    //readonly URL = 'https://tcxi8qf38d.execute-api.us-east-1.amazonaws.com/dev/api';

    constructor(private http: HttpClient, public router: Router, public _matDialog: MatDialog,
    ) {
        this.isUserLoggedIn = new BehaviorSubject<boolean>(false);
    }


    getUser(id: number, password: string) {
        return this.http.get(`${this.getStaffUrl()}user/${id}`).subscribe((res) => {
            console.log(res)
            if (res['Item'] == null) { 
                const dialogConfig = this._matDialogConfig;
                    dialogConfig.data = { header: 'Failure!', content: 'Id or Password is wrong' };
                    this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
             }
            else {
                if (res['Item'].password == password) {
                    console.log("ok")
                    this.isUserLoggedIn.next(true);
                    let username = id.toString();
                    localStorage.setItem('id', username)
                    this.router.navigate(['/orders'])

                }
                else{
                    const dialogConfig = this._matDialogConfig;
                    dialogConfig.data = { header: 'Failure!', content: 'Id or Password is wrong' };
                    this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
                }
            }


        })
    }

    reset() {
        localStorage.clear()
        console.log(localStorage.getItem('id'))
        this.isUserLoggedIn.next(false);
        return this.isUserLoggedIn.asObservable();

    }
    getAuthStatus() {
        return this.isUserLoggedIn.asObservable();
    }

    getStaffUrl() {
        return environment.staffUrl
    }
}
