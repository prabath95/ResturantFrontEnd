import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,FormBuilder  } from "@angular/forms";
import { LoginServiceService } from '../services/login/login-service.service';
import { Router } from "@angular/router";
import swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidCredentials: boolean = false;
  user:any;
  error:any;
  pureEmail:any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private loginService:LoginServiceService,public router:Router , private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      "username": [null, Validators.compose([Validators.required, Validators.pattern(this.pureEmail)])],
      "password": [null, Validators.required],
    });
  }
  login(){
    this.user = {
      "Email" : this.loginForm.get('username').value,
      "password" : this.loginForm.get('password').value
    }
    this.loginService.post("user/login",this.user)
    .subscribe((data)=>{
      if(data.success){
        this.router.navigateByUrl('/booktable');
        localStorage.setItem("user",data.user);
        window.location.reload();
      }else{
        this.invalidCredentials = true;
        this.error = data.msg; 
      }
    },(err)=>{
      swal("Ops!", "Login Fail", "error");
    });
  }
  signup(){
    this.router.navigateByUrl('/signup');
  }
}

