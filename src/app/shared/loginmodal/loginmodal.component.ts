import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css']
})
export class LoginmodalComponent implements OnInit {
  reserveForm:FormGroup;
  constructor() {
   
   }

  ngOnInit() {
    this.reserveForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

}
