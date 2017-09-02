import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  account_type: any;
  constructor() { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.account_type = this.user.accounttype;
  }

}
