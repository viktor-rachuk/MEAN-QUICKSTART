import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  email: any;
  password: any;
  email_valid: any;
  valid_password: any;
  code: any;
  sent_code: any;
  msg: any;
  code_confirmed: any;
  done_reset: any;
  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.email_valid = true;
    this.sent_code = false;
    this.code_confirmed = false;
    this.done_reset = false;
    this.valid_password = true;
    this.msg = '';
  }
  sendCode() {
    console.log(this.email);
    this.userService.sendCode(this.email).then(res => {
      if (res['success']) {
        this.sent_code = true;
        this.msg = res['msg'];
      } else {
        this.sent_code = false;
        this.msg = res['msg'];
      }
    }, err => {
      console.log(err);
    });
  }

  confirmCode() {
    const confirm_info = {
      'email': this.email,
      'code': this.code
    };
    this.userService.confirmCode(confirm_info).then(res => {
      if (res['success']) {
        this.code_confirmed = true;
        this.msg = res['msg'];
      } else {
        this.msg = res['msg'];
      }
    }, err => {
      console.log(err);
    });

  }

  resetPassword() {
    const reset_info = {
      'email': this.email,
      'password': this.password
    };
    this.userService.resetPassword(reset_info).then(res => {
      if (res['success']) {
        this.done_reset = true;
        this.msg = res['msg'];
      } else {
        this.msg = res['msg'];
      }
    }, err => {
      console.log(err);
    });
  }

  validatePassword(event) {
    if (this.password === event.target.value) {
      this.valid_password = true;
    } else {
      this.valid_password = false;
    }
  }

}
