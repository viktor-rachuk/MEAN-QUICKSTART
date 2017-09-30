import { Injectable } from '@angular/core';

@Injectable()
export class CurrentpermissionService {
  user: any;
  user_type: any;
  staff_permission: any;
  customer_permission: any;
  store_permission: any;
  order_permission: any;
  role_permission: any;
  company_permission: any;
  display_dashboard: any;
  send_remittance: any;

  constructor() { }

  getPermissions(callback) {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user.special_permissions) {
      this.staff_permission = this.user.special_permissions['staff'];
      this.customer_permission = this.user.special_permissions['customer'];
      this.store_permission = this.user.special_permissions['store'];
      this.order_permission = this.user.special_permissions['order'];
      this.role_permission = this.user.special_permissions['role'];
      this.company_permission = this.user.special_permissions['company'];
      this.display_dashboard = this.user.special_permissions['display_dashboard'];
      this.send_remittance = this.user.special_permissions['send_remittance'];
    }
    if (this.user.role) {
      this.staff_permission = this.user.role['staff'];
      this.customer_permission = this.user.role['customer'];
      this.store_permission = this.user.role['store'];
      this.order_permission = this.user.role['order'];
      this.role_permission = this.user.role['role'];
      this.company_permission = this.user.role['company'];
      this.display_dashboard = this.user.role['display_dashboard'];
      this.send_remittance = this.user.role['send_remittance'];
    }
    this.user_type = this.user.accounttype;
    const current_permissions = {
      'user_type': this.user_type,
      'staff': this.staff_permission,
      'customer': this.customer_permission,
      'store': this.store_permission,
      'order': this.order_permission,
      'role': this.role_permission,
      'company': this.company_permission,
      'dashboard': this.display_dashboard,
      'send_remittance': this.send_remittance
    };

    return callback(current_permissions);
  }

}
