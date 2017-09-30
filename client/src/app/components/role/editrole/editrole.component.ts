import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { ToastrService } from 'ngx-toastr';
import { CurrentpermissionService } from '../../../services/currentpermission.service';
// TO use jQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'app-editrole',
  templateUrl: './editrole.component.html',
  styleUrls: ['./editrole.component.css'],
})
export class EditroleComponent implements OnInit {
  currentRole: any = {};
  staff: any = {};
  customer: any = {};
  store: any = {};
  order: any = {};
  role: any = {};
  status: any;
  company: any = {};
  display_dashboard: any;
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  send_remittance: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private toastr: ToastrService,
    private permissionService: CurrentpermissionService
  ) {
    this.permissionService.getPermissions((permissions) => {
      const role_permission = permissions.role;
      if (permissions.user_type !== 'super') {
        if (!role_permission.edit) {
          window.history.back();
          this.toastr.error('You have no permission to edit role!', 'Permission Error', this.toastr_options);
        }
      }
    });
  }

  ngOnInit() {
    this.getRoleDetails(this.route.snapshot.params['id']);
  }

  getRoleDetails(id) {
    this.roleService.getRoleDetails(id).then(
      res => {
        this.currentRole = res;
        this.staff = res['staff'];
        this.customer = res['customer'];
        this.store = res['store'];
        this.order = res['order'];
        this.role = res['role'];
        this.company = res['company'];
        this.status = res['status'];
        this.display_dashboard = res['display_dashboard'];
        this.send_remittance = res['send_remittance'];
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
    this.currentRole.staff = this.staff;
    this.currentRole.customer = this.customer;
    this.currentRole.order = this.order;
    this.currentRole.store = this.store;
    this.currentRole.role = this.role;
    this.currentRole.status = this.status;
    this.currentRole.display_dashboard = this.display_dashboard;
    this.currentRole.send_remittance = this.send_remittance;
    this.roleService.updateRole(this.currentRole._id, this.currentRole).then(
      res => {
        if (!res['success']) {
          this.toastr.error(' Sorry, unable to edit a user role right now, please try again soon', '', this.toastr_options);
        } else {
          this.toastr.success('Success !!!', '', this.toastr_options);
          this.router.navigate(['/roles']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  cancel() {
    this.router.navigate(['/roles']);
  }
}
