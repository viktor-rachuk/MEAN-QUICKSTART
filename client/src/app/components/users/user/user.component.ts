import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { StaffEditComponent } from './staff/staff.component';
import { CustomerEditComponent } from './customer/customer.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: any;
  user_permission: any;
  current_user: any;
  accounttype: any;
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private toastr: ToastrService
  ) {
    this.current_user = JSON.parse(localStorage.getItem('user'));
    // this.usertype = this.user.accounttype;
    if (this.current_user.special_permissions) {
      this.user_permission = this.current_user.special_permissions;
    }
    if (this.current_user.role) {
      this.user_permission = this.current_user.role;
    }
    if (this.current_user.accounttype !== 'super') {
      if (!this.user_permission.edit) {
        window.history.back();
        this.toastr.error('You have no permission to edit user!', 'Permission Error', this.toastr_options);
      }
    };
  }

  ngOnInit() {
    this.user = {};
    this.getUserDetails(this.route.snapshot.params['id']);
  }

  getUserDetails(id) {
    this.userService.getUserDetails(id).then(
      res => {
        this.user = res;
        this.accounttype = this.user.user.accounttype;
      },
      err => {
        console.log(err);
      }
    );
  }
}
