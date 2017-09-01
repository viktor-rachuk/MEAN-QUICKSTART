import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CompanyService } from '../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-users',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  companies: any;
  users: any = [];
  childs: any = [];
  temp: any = [];
  user: any;
  location: Location;
  user_role; any;
  user_permission: any;
  filterUserType: any;
  customertype: any;
  selectedUsers: any = [];
  constructor(
    private usersService: UsersService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.special_permissions) {
      this.user_permission = this.user.special_permissions;
    }
    if (this.user.role) {
      this.user_permission = this.user.role;
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
    this.companyService.getAllCompanies().then(res => {
      this.companies = res;
      if (this.user.accounttype === 'super' || this.user.accounttype === 'staff') {
        this.usersService.getAllUsers().then(
          (respond) => {
            this.users = respond;
            this.temp = this.users;
          },
          (error) => {
            console.log(error);
          }
        );
      }

      if (this.user.accounttype === 'customer') {
        const companies = [];
        for (let i = 0; i< Object.keys(this.companies).length; i ++) {
          companies.push(this.companies[i]._id);
        }
        this.usersService.getAllCustomers(companies).then(respond => {
          if (this.user_permission.customer.create || this.user_permission.customer.edit || this.user_permission.customer.delete || this.user_permission.customer.view) {
            this.childs = respond;
          }
          if (this.user_permission.staff.create || this.user_permission.staff.edit || this.user_permission.staff.delete || this.user_permission.staff.view) {
            this.usersService.getAllUsers().then(all_users => {
              for (let i = 0; i < Object.keys(all_users).length; i ++) {
                if (all_users[i].accounttype === 'staff') {
                  this.childs.push(all_users[i]);
                }
              }
              this.users = this.childs;
            }, err_all_users => {
              console.log(err_all_users);
            });
          } else {
            this.users = this.childs;
          }
        }, error => {
          console.log(error);
        });
      }
    }, err => {
      console.log(err);
    });
  }
  selectElement(event) {
    if (event.target.checked) {
      this.selectedUsers.push(event.target.value);
    } else {
      for (let i = 0; i < this.selectedUsers.length; i++) {
        if (this.selectedUsers[i] === event.target.value) {
          this.selectedUsers.splice(i, 1);
        }
      }
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
