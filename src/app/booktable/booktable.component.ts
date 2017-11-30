import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from "@angular/forms";
import { Router } from "@angular/router"

@Component({
  selector: 'app-booktable',
  templateUrl: './booktable.component.html',
  styleUrls: ['./booktable.component.css']
})
export class BooktableComponent implements OnInit {
  basic:boolean;
  reserveForm:FormGroup;
  description: string;
  title : String;

  constructor(public router:Router) { 
    this.reserveForm = new FormGroup({
      Email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone : new FormControl('', Validators.required),
      dateBook: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      comments: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    if (localStorage.getItem('user')==null || localStorage.getItem('user') == undefined ){
      this.basic = true;
      this.title ="Login Required";
      this.description = "Please login to Reserve a table Press OK to Continue";
      
    }
    else{
      this.basic = false;
    }
  }
  LoginPage(){
    this.basic = false;
    this.router.navigateByUrl('/login');
  }
  onsubmit(){
    console.log(this.reserveForm.get("startTime"));
  }

}
