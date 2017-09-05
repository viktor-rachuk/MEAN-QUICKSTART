import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'super-profile',
  templateUrl: './super.component.html',
  styleUrls: ['./super.component.css']
})
export class SuperComponent implements OnInit {

  super = {};
  user: any;
  user_info = {};
  location: Location;

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    // Init UI elements
    toastr.options = {
      'debug': false,
      'newestOnTop': false,
      'positionClass': 'toast-bottom-right',
      'closeButton': true,
      'progressBar': true
    };
    this.userService.getUserDetails(this.user['id']).then((res) => {
      console.log(res);
      this.super = res['user'];
      this.user_info = this.super['user_info'];
    }, (err) => {
      console.log(err);
    });
  }

  onSubmit() {
    this.super['user_info'] = this.user_info;
    this.super['status'] = 'active';
    this.super['accounttype'] = 'super';
    this.userService.updateUser(this.super['userid'], this.super).then(
      result => {
        if (!result['success']) {
          toastr.error('Sorry, cannot edit this user, please try again');
        } else {
          toastr.success('Success !!!');
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

}
