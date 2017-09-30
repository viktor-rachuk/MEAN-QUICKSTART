import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
declare var jQuery: any;

@Component ({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css'],
})
export class NavmenuComponent implements AfterViewInit {
  user: any;
  user_role: any;
  staff_permission: any;
  customer_permission: any;
  store_permission: any;
  order_permission: any;
  role_permission: any;
  company_permission: any;
  display_dashboard: any;
  activatedRoute = '/dashboard';
  constructor (private router: Router, location: Location) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.special_permissions) {
      this.staff_permission = this.user.special_permissions['staff'];
      this.customer_permission = this.user.special_permissions['customer'];
      this.store_permission = this.user.special_permissions['store'];
      this.order_permission = this.user.special_permissions['order'];
      this.role_permission = this.user.special_permissions['role'];
      this.company_permission = this.user.special_permissions['company'];
      this.display_dashboard = this.user.special_permissions['display_dashboard'];
    }
    if (this.user.role) {
      this.staff_permission = this.user.role['staff'];
      this.customer_permission = this.user.role['customer'];
      this.store_permission = this.user.role['store'];
      this.order_permission = this.user.role['order'];
      this.role_permission = this.user.role['role'];
      this.company_permission = this.user.role['company'];
      this.display_dashboard = this.user.role['display_dashboard'];
    }
    router.events.subscribe((val) => {
      if (location.path() !== '') {
        this.activatedRoute = location.path();
      } else {
        this.activatedRoute = '/dashboard';
      }
    });
  }

  ngAfterViewInit() {
      $('#menu').metisMenu();
  }
}
