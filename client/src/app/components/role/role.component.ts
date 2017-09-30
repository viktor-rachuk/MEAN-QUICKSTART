import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { CurrentpermissionService } from '../../services/currentpermission.service';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  public loading = false;
  roles: any = [];
  selectedRoles: any = [];
  user: any;
  role_permission: any;
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
    this.user = JSON.parse(localStorage.getItem('user'));
    this.permissionService.getPermissions((permissions) => {
      this.role_permission = permissions.role;
      if (permissions.user_type !== 'super') {
        if (!this.role_permission.create && !this.role_permission.edit && !this.role_permission.delete && !this.role_permission.view) {
          window.history.back();
          this.toastr.error('You have no permission to access roles!', 'Permission Error', this.toastr_options);
        }
      }
    });
  }
  ngOnInit() {
    this.roles = [];
    this.selectedRoles = [];
    this.getAllRoles();
  }

  getAllRoles() {
    this.loading = true;
    this.roleService.getAllRoles().then(
      res => {
        this.loading = false;
        this.roles = res;
      },
      err => {
        console.log(err);
      }
      );
  }

  selectElement(event) {
    if (event.target.checked) {
      this.selectedRoles.push(event.target.value);
    } else {
      this.selectedRoles.splice(this.selectedRoles.indexOf(event.target.value), 1);
    }
  }

  deleteRoles() {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover selected roles!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(() => {
      this.roleService.deleteRoles(this.selectedRoles).then(
        res => {
          if (res['success']) {
            this.selectedRoles = [];
            this.getAllRoles();
          }
        },
        err => {
          console.error(err);
        });
      swal(
        'Deleted!',
        'Selected roles has been deleted.',
        'success'
        );
    }, (dismiss) => {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
          );
      }
    });
  }

  reactivateRoles() {
    this.roleService.reactivateRoles(this.selectedRoles).then(
      res => {
        this.getAllRoles();
      },
      err => {
        console.error(err);
      }
      );
  }

  deactivateRoles() {
    this.roleService.deactivateRoles(this.selectedRoles).then(
      res => {
        this.getAllRoles();
      },
      err => {
        console.error(err);
      }
      );
  }
}
