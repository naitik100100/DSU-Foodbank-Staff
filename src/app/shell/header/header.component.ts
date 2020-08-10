import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { I18nService } from '@app/i18n';
import { AuthService } from '@app/@shared/service/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public status=false;

  @Input() sidenav!: MatSidenav;

  constructor(private titleService: Title, private i18nService: I18nService,
    private service: AuthService,
) { }

  ngOnInit() { 
    this.service.getAuthStatus().subscribe((res)=>
    {
      this.status=res
    })
    console.log(this.status) }
 
  get title(): string {
    return this.titleService.getTitle();
  }

  logout(){
    console.log("logout")
    this.service.reset().subscribe((res)=>{
      this.status=res
      console.log(this.status)
      this.ngOnInit
    })
  }


}
