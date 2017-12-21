import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  UserName:any;
  constructor(public router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null || localStorage.getItem('user') == undefined){
      this.UserName = "";
    }else{
      this.UserName =localStorage.getItem("user"); 
    }
  }
  logout(){
    localStorage.removeItem("user");
    window.location.reload();
  }
  login(){
    this.router.navigateByUrl('/login');
  }
  signUp(){
    this.router.navigateByUrl('/signup');
  }
}
