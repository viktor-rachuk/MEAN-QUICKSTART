import { Component, OnInit } from '@angular/core';
import { CustomerComponent } from './customer/customer.component';
import { StaffComponent } from './staff/staff.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  user: any;
  usertype: any;
  user_permission: any;
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.usertype = '';
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.usertype = this.user.accounttype;
    if (this.user.special_permissions) {
      this.user_permission = this.user.special_permissions;
    }
    if (this.user.role) {
      this.user_permission = this.user.role;
    }
    if (this.user.accounttype !== 'super') {
      if (!this.user_permission.create) {
        window.history.back();
        this.toastr.error('You have no permission to create users!', 'Permission Error', this.toastr_options);
      }
    }
  }

}
