import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators ,FormBuilder} from "@angular/forms";
import { Router } from "@angular/router"
import { window } from 'rxjs/operator/window';
import { BookingserviceService } from "../services/booking/bookingservice.service";
import swal from 'sweetalert2'
import { error } from 'util';

@Component({
  selector: 'app-booktable',
  templateUrl: './booktable.component.html',
  styleUrls: ['./booktable.component.css']
})
export class BooktableComponent implements OnInit {
  basic:boolean;
  paymentVerification:boolean;
  reserveForm:FormGroup;
  description: string;
  title : String;
  submitted: boolean;
  bookingData:any;
  pureEmail:any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  contact:any = /[2-9]{2}\d{7}/;
  price:Number;
  selectedTable:any;

  tables:any = 
  [ {"ID" : "Table 1"},
    {"ID" : "Table 2"},
    {"ID" : "Table 3"},
    {"ID" : "Table 4"},
    {"ID" : "Table 5"},
    {"ID" : "Table 6"},
    {"ID" : "Table 7"},
    {"ID" : "Table 8"},
    {"ID" : "Table 9"},
    {"ID" : "Table 10"},
    {"ID" : "Table 11"},
    {"ID" : "Table 12"},
    {"ID" : "Table 13"}];

  constructor(public router:Router , private booking:BookingserviceService,private formbuilder: FormBuilder) { 
    this.reserveForm = this.formbuilder.group({
      "username": [null, Validators.compose([Validators.required, Validators.pattern(this.pureEmail)])],
      "Email": [null, Validators.compose([Validators.required, Validators.pattern(this.pureEmail)])],
      "name": [null, Validators.required],
      "phone" : [null, Validators.compose([Validators.required, Validators.pattern(this.contact)])],
      "dateBook": [null, Validators.required],
      "startTime": [null, Validators.required],
      "endTime": [null, Validators.required],
      "table": [null, Validators.required],
      "comments": [null, Validators.required],
      "price": [null, Validators.required]
    });
    this.submitted = false;
    this.paymentVerification=false;
  }

  ngOnInit() {
    if (localStorage.getItem('user')==null || localStorage.getItem('user') == undefined ){
      this.basic = true;
      this.title ="Login Required";
      this.description = "Please login to Reserve a table Press OK to Continue";
    }
    else{
      this.basic = false;
      this.reserveForm.controls['username'].setValue(localStorage.getItem("user"));
    }
  }
  LoginPage(){
    this.basic = false;
    this.router.navigateByUrl('/login');
  }
  addBooking(){
    console.log(this.selectedTable);
    this.bookingData = {
    "userName": this.reserveForm.get("username").value,
    "email": this.reserveForm.get("Email").value,
    "tableNo": this.selectedTable,
    "Date": this.reserveForm.get("dateBook").value,
    "StartTime": this.reserveForm.get("startTime").value,
    "EndTime": this.reserveForm.get("endTime").value,
    "contact": this.reserveForm.get("phone").value,
    "comments": this.reserveForm.get("comments").value,
    "price": this.price
    }
    console.log(this.bookingData);
    this.booking.bookTable(this.bookingData)
    .subscribe((data)=>{
      if(data.success){
        swal("Sucess", data.msg, "success");
        this.paymentVerification=false;
        this.reserveForm.reset(); 
      }else{
        swal("Ops!", data.msg, "warning");
      }
    },(err)=>{
        swal("Ops!", err, "error");
    });
  }
  homePage(){
    this.basic = false;
    this.router.navigateByUrl('/home');
  }
  proceedPayment(){
    this.paymentVerification=true;
  }
  calculatePrice(value){
    this.selectedTable = value.ID;
    if(value.ID == "Table 12"||value.ID =="Table 13"){
      this.reserveForm.controls['price'].setValue("RS 2000");
      this.price = 2000;
    }else if(value.ID == "Table 7"||value.ID == "Table 8"||value.ID == "Table 9"||value.ID == "Table 10"||
    value.ID == "Table 11"){
      this.reserveForm.controls['price'].setValue("RS 1500");
      this.price = 1500;
    }else{
      this.reserveForm.controls['price'].setValue("RS 1500");
      this.price = 1000;
    }
  }

}
