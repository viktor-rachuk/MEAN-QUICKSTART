import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { CompanyService } from '../../../services/company.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'staff-profile',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffProfileComponent implements OnInit {
  current_user: any;
  user_info: any = {};
  user: any = {};
  old_email: any;
  email_valid = true;
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.current_user = JSON.parse(localStorage.getItem('user'));
    this.getUserDetails();
    // Init UI elements
  }
  getUserDetails() {
    const userId = this.current_user.id;
    this.userService.getUserDetails(userId).then((res) => {
      this.user = res['user'];
      this.old_email = this.user.email;
      this.user_info = this.user['user_info'];
    }, (err) => {
      console.log(err);
    });
  }
  onSubmit() {
    this.user['user_info'] = this.user_info;
    this.user.username = this.user.username.trim();
    this.user.email = this.user.email.trim();
    this.user['status'] = 'active';
    this.user['accounttype'] = 'staff';
    this.userService.updateUser(this.user['id'], this.user).then(
      result => {
        if (!result['success']) {
          this.toastr.error('Sorry, cannot edit this user, please try again', '', this.toastr_options);
        } else {
          this.toastr.success('Success !!!', '', this.toastr_options);
          this.router.navigate(['/profile']);
        }
      },
      err => {
        console.log(err);
      }
      );
  }

  cancel() {
    window.history.back();
  }
  validateEmail(email: string) {
    if (this.old_email !== email) {
      this.userService.checkEmail(email).then(res => {
        if (res['success']) {
          this.email_valid = true;
        } else {
          this.email_valid = false;
        }
      }, err => {
        console.log(err);
      });
    }
  }
  setEmailValid() {
    this.email_valid = true;
  }

}
