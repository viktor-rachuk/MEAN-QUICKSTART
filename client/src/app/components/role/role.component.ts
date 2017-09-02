import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
declare var swal: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  roles: any;
  selectedRoles: any;
  user: any;
  location: Location;
  role_permission: any;
  constructor(
    private router: Router,
    private roleService: RoleService
    ) {
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user.special_permissions) {
        this.role_permission = this.user.special_permissions['role'];
      }
      if (this.user.role) {
        this.role_permission = this.user.role['role'];
      }
    }
  ngOnInit() {
    this.roles = [];
    this.selectedRoles = [];
    this.getAllRoles();
  }

  getAllRoles() {
    this.roles = [];
    this.roleService.getAllRoles().then(
      res => {
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
      for (let i = 0; i < this.selectedRoles.length; i++) {
        if (this.selectedRoles[i] === event.target.value) {
          this.selectedRoles.splice(i, 1);
        }
      }
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
