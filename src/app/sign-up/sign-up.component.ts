import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators ,FormBuilder} from "@angular/forms";
import { Router } from "@angular/router"
import { LoginServiceService } from '../services/login/login-service.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  singUpForm:FormGroup;
  pureEmail:any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  contact:any = /[2-9]{2}\d{7}/;
  signUpData:any;

  constructor(public router:Router , private userService:LoginServiceService,private formbuilder: FormBuilder) { 
    this.singUpForm = this.formbuilder.group({
      "lname": [null, Validators.required],
      "Email": [null, Validators.compose([Validators.required, Validators.pattern(this.pureEmail)])],
      "fname": [null, Validators.required],
      "phone" : [null, Validators.compose([Validators.required, Validators.pattern(this.contact)])],
      "password": [null, Validators.required],
      "cpassword": [null, Validators.required],
    });
  }

  ngOnInit() {
  }
  signUp(){
    this.signUpData = {
    "firstName": this.singUpForm.get("fname").value,
    "lastname": this.singUpForm.get("lname").value,
    "Email": this.singUpForm.get("Email").value,
    "contact": this.singUpForm.get("phone").value,
    "password": this.singUpForm.get("password").value
    }
    if(this.signUpData.password != this.singUpForm.get("cpassword").value){
      swal("Ops!", "Confirm password does not match", "warning");
    }else{
    console.log(this.signUpData);
    this.userService.signUp(this.signUpData)
    .subscribe((data)=>{
      if(data.success){
        swal("Sucess", data.msg, "success");
        this.router.navigateByUrl('/login');
      }else{
        swal("Ops!", data.msg, "warning");
      }
    },(err)=>{
        swal("Ops!", err, "error");
    });
  }
}
}
