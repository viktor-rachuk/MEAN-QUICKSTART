import { Component, OnInit } from '@angular/core';
import { CustomerComponent } from  './customer/customer.component';
import { StaffComponent } from './staff/staff.component';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  user: any;
  usertype: any;
  
  constructor() { }

  ngOnInit() {
    this.usertype = '';
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.usertype = this.user.accounttype;
  }

}
