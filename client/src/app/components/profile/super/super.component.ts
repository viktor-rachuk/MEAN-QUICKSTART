import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'super-profile',
  templateUrl: './super.component.html',
  styleUrls: ['./super.component.css']
})
export class SuperComponent implements OnInit {

  super: any = {};
  user: any;
  old_email: any;
  email_valid = true;
  user_info: any = {};
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(private userService: UsersService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getUserDetails(this.user['id']).then((res) => {
      this.super = res['user'];
      this.old_email = this.super.email;
      this.user_info = this.super['user_info'];
    }, (err) => {
      console.log(err);
    });
  }

  onSubmit() {
    this.super['user_info'] = this.user_info;
    this.super['status'] = 'active';
    this.super['accounttype'] = 'super';
    this.super['username'] = this.super['username'].trim();
    this.super['email'] = this.super['email'].trim();
    this.userService.updateUser(this.super['userid'], this.super).then(
      result => {
        if (!result['success']) {
          this.toastr.error('Sorry, cannot edit this user, please try again', '', this.toastr_options);
        } else {
          this.toastr.success('Success !!!', '', this.toastr_options);
          window.history.back();
        }
      },
      err => {
        console.log(err);
      });

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
