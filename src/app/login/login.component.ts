import { UserService } from './../@shared/service/user.service';
import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { UserModel } from '@app/@shared/model/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  _user: UserModel[] = [];
  _loginForm: FormGroup;

  isLoggedIn = false
  version: string | null = environment.version;

  constructor(public userService: UserService,public router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this._createLoginForm();
    
   }

  submit(){
    if(this._loginForm.valid){
      //console.log('Id from form',this._loginForm.value.id)
      this.getUser(this._loginForm.value.id);
     
    }
  }

  getUser(ID: number){
    this.userService.getUser(this._loginForm.value.id).subscribe((data:UserModel)=>{
      console.log(data);
      this._user = data['Item']
      console.log('id from database',this._user['id'])
      if(this._loginForm.value.id == this._user['id'] && this._loginForm.value.password == this._user['password']){
       this.isLoggedIn = true
        this.router.navigateByUrl('/orders');
      }
      else{
        console.log('id or password is worng')
      }
  })

  }

  get id() {
    return this._loginForm.controls.id;
  }
  get password() {
    return this._loginForm.controls.password;
  }

  private _createLoginForm() {
    this._loginForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      password: ['', Validators.required],

    });
  }
}
