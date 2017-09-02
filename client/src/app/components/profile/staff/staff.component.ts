import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { CompanyService } from '../../../services/company.service';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'staff-profile',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffProfileComponent implements OnInit {
  user_info: any = {};
  user = {};
  users = [];
  location: Location;
  constructor(
    private userService: UsersService,
    private router: Router,
    location: Location
    ) { this.location = location; }

  ngOnInit() {
    this.getUserDetails();
    // Init UI elements
    toastr.options = {
      'debug': false,
      'newestOnTop': false,
      'positionClass': 'toast-bottom-right',
      'closeButton': true,
      'progressBar': true
    };
  }

  getUserDetails() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    this.userService.getUserDetails(userId).then((res) => {
      this.user = res['user'];
      this.user_info = this.user['user_info'];
    }, (err) => {
      console.log(err);
    });
  }
  onSubmit() {
    this.user['user_info'] = this.user_info;
    this.user['status'] = 'active';
    this.user['accounttype'] = 'staff';
    this.userService.updateUser(this.user['id'], this.user).then(
      result => {
        if (!result['success']) {
          toastr.error('Sorry, cannot edit this user, please try again');
        } else {
          toastr.success('Success !!!');
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

}
