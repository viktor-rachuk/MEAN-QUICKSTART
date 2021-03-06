import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CompanyService } from '../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrentpermissionService } from '../../services/currentpermission.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
declare var $: any;
import swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public loading = false;
  companies: any = [];
  users: any = [];
  childs: any = [];
  temp: any = [];
  user: any;
  location: Location;
  user_role: any;
  user_permission: any;
  filterUserType: any;
  customertype: any;
  selectedUsers: any = [];
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
    private usersService: UsersService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private permissionService: CurrentpermissionService,

    ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.special_permissions) {
      this.user_permission = this.user.special_permissions;
    }
    if (this.user.role) {
      this.user_permission = this.user.role;
    }
    if (this.user.accounttype !== 'super') {
      if (!this.user_permission.customer.create &&
        !this.user_permission.customer.edit &&
        !this.user_permission.customer.delete &&
        !this.user_permission.customer.view &&
        !this.user_permission.staff.create &&
        !this.user_permission.staff.edit &&
        !this.user_permission.staff.delete &&
        !this.user_permission.staff.view) {
        window.history.back();
        this.toastr.error('You have no permission to access users!', 'Permission Error', this.toastr_options);
      }
    }
  }

  ngOnInit() {
    this.filterUserType = '';
    this.getAllUsers();
  }
  filter() {
    if (this.user.accounttype === 'super' || this.user.accounttype === 'staff') {
      let temp1 = [];
      if (this.filterUserType === 'all') {
        temp1 = this.users;
      } else {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].accounttype === this.filterUserType) {
            temp1.push(this.users[i]);
          }
        }
      }
      this.temp = temp1;
    }
    if (this.user.accounttype === 'customer') {
      let temp1 = [];
      if (this.filterUserType === 'all') {
        temp1 = this.users;
      } else {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].accounttype === this.filterUserType) {
            temp1.push(this.users[i]);
          }
        }
      }
      this.childs = temp1;
    }
  }
  getAllUsers() {
    this.loading = true;
    this.companyService.getAllCompanies().then(res => {
      this.companies = res;
      if (this.user.accounttype === 'super' || this.user.accounttype === 'staff') {
        this.usersService.getAllUsers().then(
          (respond) => {
            this.loading = false;
            this.users = respond;
            this.temp = this.users;
          },
          (error) => {
            this.loading = false;
            console.log(error);
          }
          );
      }

      if (this.user.accounttype === 'customer') {
        const companies = [];
        let stores = [];
        for (let i = 0; i < this.companies.length; i ++) {
          companies.push(this.companies[i]._id);
          for (let j = 0; j < this.companies[i]['assigned_stores'].length;  j ++) {
            stores.push(this.companies[i]['assigned_stores'][j]);
          }
          stores = Array.from(new Set(stores));
        }
        this.usersService.getAllCustomers(companies).then(respond => {
          this.loading = false;
          if (this.user_permission.customer.create || this.user_permission.customer.edit ||
            this.user_permission.customer.delete || this.user_permission.customer.view) {
            this.childs = respond;
        }
      }, error => {
        this.loading = false;
        console.log(error);
      });

        if (this.user_permission.staff.create || this.user_permission.staff.edit ||
          this.user_permission.staff.delete || this.user_permission.staff.view) {
          this.usersService.getStaffOfCustomer(stores).then(respond => {
            this.loading = false;
            for (let i = 0; i < Object.keys(respond).length; i ++) {
              this.childs.push(respond[i]);
            }
          }, error => {
            this.loading = false;
            console.log(error);
          });
      }
    }
  }, err => {
    console.log(err);
  });
  }
  selectElement(event) {
    if (event.target.checked) {
      this.selectedUsers.push(event.target.value);
    } else {
      // const index = this.selectedUsers.findIndex(x => x === event.target.value);
      this.selectedUsers.splice(this.selectedUsers.indexOf(event.target.value), 1);
    }
  }

  inActivateUsers() {
    this.usersService.inActivateUser(this.selectedUsers).subscribe(data => {
      this.getAllUsers();
      this.selectedUsers = [];
    });
  }

  reActivateUsers() {
    this.usersService.deActivateUsers(this.selectedUsers).subscribe(data => {
      this.getAllUsers();
      this.selectedUsers = [];
    });
  }

  deleteUsers() {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover selected users!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(() => {
      this.usersService.deleteUsers(this.selectedUsers).subscribe(data => {
        this.getAllUsers();
        this.selectedUsers = [];
      });
      swal(
        'Deleted!',
        'Selected Users has been deleted.',
        'success'
        );
    }, function(dismiss) {
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

  createNewUser() {
    this.router.navigate(['/user']);
  }
}
