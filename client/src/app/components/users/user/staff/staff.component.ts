import { Component, OnInit, Input } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../../services/role.service';
import { UsersService } from '../../../../services/users.service';
import { StoresService } from '../../../../services/stores.service';
import { ToastrService } from 'ngx-toastr';

// TO use jQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'edit-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffEditComponent implements OnInit {
  @Input() user: any;
  staff: any;
  email_valid = true;
  old_email: any;
  user_info: any;
  currentCompanies: any = [];
  customerPermission: any = {};
  staffPermission: any = {};
  storePermission: any = {};
  orderPermission: any = {};
  rolePermission: any = {};
  companyPermission: any = {};
  display_dashboard: any;
  send_remittance = false;
  home_url: any;
  roles: any = [];
  stores: any = [];
  stores_assigned = [];
  currentUser: any;
  modalValid = true;
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
    private router: Router,
    private roleService: RoleService,
    private userService: UsersService,
    private storeService: StoresService,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.staff = this.user.user;
    this.old_email = this.staff.email;
    this.stores_assigned = this.staff['stores_assigned'];
    this.user_info = this.user.user['user_info'];
    if (this.staff.special_permissions) {
      if (Object.keys(this.staff.special_permissions).length !== 0) {
        this.companyPermission = this.staff.special_permissions.company;
        this.staffPermission = this.staff.special_permissions.staff;
        this.customerPermission = this.staff.special_permissions.customer;
        this.orderPermission = this.staff.special_permissions.order;
        this.storePermission = this.staff.special_permissions.store;
        this.rolePermission = this.staff.special_permissions.role;
        this.home_url = this.staff.special_permissions.home_url;
        this.display_dashboard = this.staff.special_permissions.display_dashboard;
        this.send_remittance = this.staff.special_permissions.send_remittance;
      } else {
        this.initPermission();
      }
    } else {
      this.initPermission();
    }
    this.getAllRoles();
    this.getAllStores();
  }
  // Init Permission
  initPermission() {
    this.staffPermission = {
      'create': false,
      'edit': false,
      'delete': false,
      'view': false
    };
    this.customerPermission = {
      'create': false,
      'edit': false,
      'delete': false,
      'view': false
    };
    this.storePermission = {
      'create': false,
      'edit': false,
      'delete': false,
      'view': false
    };
    this.orderPermission = {
      'create': false,
      'edit': false,
      'delete': false,
      'view': false
    };
    this.rolePermission = {
      'create': false,
      'edit': false,
      'delete': false,
      'view': false
    };
    this.companyPermission = {
      'create': false,
      'edit': false,
      'delete': false,
      'view': false
    };
  }
  // Get All Stores
  getAllStores() {
    this.storeService.getAllStores().then((res) => {
      this.stores = res;
      for (let i = 0; i < this.stores.length; i++) {
        for (let j = 0; j < this.stores_assigned.length; j++) {
          if (this.stores[i]._id === this.stores_assigned[j]) {
            this.stores[i].checked = true;
          }
        }
      }
    }, (err) => {
      console.log(err);
    });
  }
  // Get Current Roles
  getAllRoles() {
    this.roleService.getAllRoles().then((res) => {
      this.roles = res;
    }, (err) => {
      console.log(err);
    });
  }

  // Select Role
  selectRole(event) {
    this.staff.role = event.target.value;
    if (this.staff.special_permissions) {
      delete this.staff.special_permissions;
    }
  }

  // Select Stores assigned to staff user
  selectStores(event) {
    if (event.target.checked) {
      this.stores_assigned.push(event.target.value);
    } else {
      for (let i = 0; i < this.stores_assigned.length; i++) {
        if (this.stores_assigned[i] === event.target.value) {
          this.stores_assigned.splice(i, 1);
        }
      }
    }
  }

  // Save Special Permissions
  savePermissions() {
    this.staff['special_permissions'] = {};
    this.staff.special_permissions.staff = this.staffPermission;
    this.staff.special_permissions.customer = this.customerPermission;
    this.staff.special_permissions.store = this.storePermission;
    this.staff.special_permissions.order = this.orderPermission;
    this.staff.special_permissions.company = this.companyPermission;
    this.staff.special_permissions.role = this.rolePermission;
    this.staff.special_permissions.display_dashboard = this.display_dashboard;
    this.staff.special_permissions.send_remittance = this.send_remittance;
    this.staff.special_permissions.home_url = this.home_url;
    this.staff.role = '';
    this.modalValid = false;
  }

  // select All permission, deselect all
  selectAll(event) {
    if (event.target.value === 'create') {
      if (event.target.checked) {
        this.staffPermission['create'] = true;
        this.customerPermission['create'] = true;
        this.companyPermission['create'] = true;
        this.rolePermission['create'] = true;
        this.storePermission['create'] = true;
        this.orderPermission['create'] = true;
      } else {
        this.staffPermission['create'] = false;
        this.customerPermission['create'] = false;
        this.companyPermission['create'] = false;
        this.rolePermission['create'] = false;
        this.storePermission['create'] = false;
        this.orderPermission['create'] = false;
      }
    } else if (event.target.value === 'edit') {
      if (event.target.checked) {
        this.staffPermission['edit'] = true;
        this.customerPermission['edit'] = true;
        this.companyPermission['edit'] = true;
        this.rolePermission['edit'] = true;
        this.storePermission['edit'] = true;
        this.orderPermission['edit'] = true;
      } else {
        this.staffPermission['edit'] = false;
        this.customerPermission['edit'] = false;
        this.companyPermission['edit'] = false;
        this.rolePermission['edit'] = false;
        this.storePermission['edit'] = false;
        this.orderPermission['edit'] = false;
      }
    } else if (event.target.value === 'delete') {
      if (event.target.checked) {
        this.staffPermission['delete'] = true;
        this.customerPermission['delete'] = true;
        this.companyPermission['delete'] = true;
        this.rolePermission['delete'] = true;
        this.storePermission['delete'] = true;
        this.orderPermission['delete'] = true;
      } else {
        this.staffPermission['delete'] = false;
        this.customerPermission['delete'] = false;
        this.companyPermission['delete'] = false;
        this.rolePermission['delete'] = false;
        this.storePermission['delete'] = false;
        this.orderPermission['delete'] = false;
      }
    } else if (event.target.value === 'view') {
      if (event.target.checked) {
        this.staffPermission['view'] = true;
        this.customerPermission['view'] = true;
        this.companyPermission['view'] = true;
        this.rolePermission['view'] = true;
        this.storePermission['view'] = true;
        this.orderPermission['view'] = true;
      } else {
        this.staffPermission['view'] = false;
        this.customerPermission['view'] = false;
        this.companyPermission['view'] = false;
        this.rolePermission['view'] = false;
        this.storePermission['view'] = false;
        this.orderPermission['view'] = false;
      }
    }
  }

  onSubmit() {
    this.staff.username = this.staff.username.trim();
    this.staff.email = this.staff.email.trim();
    this.staff['user_info'] = this.user_info;
    this.staff['status'] = 'active';
    this.staff['accounttype'] = 'staff';
    this.staff['company'] = 'Carpet Court';
    if (this.staff.role !== '') {
      delete this.staff.special_permissions;
    }
    this.userService.updateUser(this.staff['id'], this.staff).then(
      result => {
        if (!result['success']) {
          this.toastr.error('Sorry, cannot edit this user, please try again', '', this.toastr_options);
        } else {
          this.toastr.success('Success !!!', '', this.toastr_options);
          this.router.navigate(['/users']);
        }
      },
      err => {
        console.log(err);
      }
      );
  }


  cancel() {
    this.router.navigate(['/users']);
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
