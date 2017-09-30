import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { ToastrService } from 'ngx-toastr';
import { CurrentpermissionService } from '../../../services/currentpermission.service';
// To use jQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'app-createrole',
  templateUrl: './createrole.component.html',
  styleUrls: ['./createrole.component.css'],
})
export class CreateroleComponent implements OnInit {
  newRole: any;
  currentRoles: any;
  error: any;
  staff: any;
  customer: any;
  store: any;
  order: any;
  role: any;
  company: any;
  home_url: any;
  status: any;
  send_remittance: any;
  display_dashboard: any;
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
    private router: Router,
    private roleService: RoleService,
    private toastr: ToastrService,
    private permissionService: CurrentpermissionService
  ) {
      this.permissionService.getPermissions((permissions) => {
      const role_permission = permissions.role;
      if (permissions.user_type !== 'super') {
        if (!role_permission.create) {
          window.history.back();
          this.toastr.error('You have no permission to create role!', 'Permission Error', this.toastr_options);
        }
      }
    });
  }

  ngOnInit() {
    this.getAllRoles();
    this.error = '';
    this.newRole = {
      role_name: '',
      staff: '',
      customer: '',
      store: '',
      order: '',
      role: '',
      company: '',
      home_url: '',
      status: '',
    };

    this.staff = {
      'create': false,
      'edit': false,
      'delete': false,
      'view': false,
    };

    this.customer = {
      'create': false,
      'edit': false,
      'delete': false,
      'view': false,
    };

    this.store = {
      'create': false,
      'edit': false,
      'delete': false,
      'view': false,
    };

    this.order = {
      'create': false,
      'edit': false,
      'delete': false,
      'view': false,
    };

    this.role = {
      'create': false,
      'edit': false,
      'delete': false,
      'view': false,
    };

    this.company = {
      'create': false,
      'edit': false,
      'delete': false,
      'view': false,
    };

    this.display_dashboard = true;
    this.home_url = '';
    this.send_remittance = false;
  }
  getAllRoles() {
    this.roleService.getAllRoles().then(
      res => {
        this.currentRoles = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  // select All permission, deselect all
  selectAll(event) {
      if (event.target.value === 'create') {
        if (event.target.checked) {
          this.staff['create'] = true;
          this.customer['create'] = true;
          this.company['create'] = true;
          this.role['create'] = true;
          this.store['create'] = true;
          this.order['create'] = true;
        } else {
          this.staff['create'] = false;
          this.customer['create'] = false;
          this.company['create'] = false;
          this.role['create'] = false;
          this.store['create'] = false;
          this.order['create'] = false;
        }
      } else if (event.target.value === 'edit') {
        if (event.target.checked) {
          this.staff['edit'] = true;
          this.customer['edit'] = true;
          this.company['edit'] = true;
          this.role['edit'] = true;
          this.store['edit'] = true;
          this.order['edit'] = true;
        } else {
          this.staff['edit'] = false;
          this.customer['edit'] = false;
          this.company['edit'] = false;
          this.role['edit'] = false;
          this.store['edit'] = false;
          this.order['edit'] = false;
        }
      } else if (event.target.value === 'delete') {
        if (event.target.checked) {
          this.staff['delete'] = true;
          this.customer['delete'] = true;
          this.company['delete'] = true;
          this.role['delete'] = true;
          this.store['delete'] = true;
          this.order['delete'] = true;
        } else {
          this.staff['delete'] = false;
          this.customer['delete'] = false;
          this.company['delete'] = false;
          this.role['delete'] = false;
          this.store['delete'] = false;
          this.order['delete'] = false;
        }
      } else if (event.target.value === 'view') {
        if (event.target.checked) {
          this.staff['view'] = true;
          this.customer['view'] = true;
          this.company['view'] = true;
          this.role['view'] = true;
          this.store['view'] = true;
          this.order['view'] = true;
        } else {
          this.staff['view'] = false;
          this.customer['view'] = false;
          this.company['view'] = false;
          this.role['view'] = false;
          this.store['view'] = false;
          this.order['view'] = false;
        }
      }
  }
  save() {
    this.newRole.staff = this.staff;
    this.newRole.customer = this.customer;
    this.newRole.store = this.store;
    this.newRole.order = this.order;
    this.newRole.role = this.role;
    this.newRole.company = this.company;
    this.newRole.home_url = this.home_url;
    this.newRole.status = true;
    this.newRole.send_remittance = this.send_remittance;
    this.newRole.display_dashboard = this.display_dashboard;
    this.roleService.saveRole(this.newRole).then(
      res => {
         if (!res['success']) {
          this.toastr.error(' Sorry, unable to create a user role right now, please try again soon', '', this.toastr_options);
        } else {
          this.toastr.success('Success !!!', '', this.toastr_options);
          this.router.navigate(['/roles']);
        }
      },
      err => {
        console.log(err);
        alert('Something went wrong!!!');
      }
    );
  }
  cancel() {
    this.router.navigate(['/roles']);
  }

}
