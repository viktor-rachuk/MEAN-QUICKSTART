import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { StaffEditComponent } from './staff/staff.component';
import { CustomerEditComponent } from './customer/customer.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: any;
  accounttype: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {}

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
