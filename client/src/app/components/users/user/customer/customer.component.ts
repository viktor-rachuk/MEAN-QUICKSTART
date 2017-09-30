import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../../services/role.service';
import { CompanyService } from '../../../../services/company.service';
import { UsersService } from '../../../../services/users.service';
import { ToastrService } from 'ngx-toastr';

// TO use jQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'app-customeredit',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerEditComponent implements OnInit {

  @Input() user: any;
  old_email: any;
  email_valid = true;
  filesToPhoto: Array<File> = [];
  confirmPassword: any;
  photo: File;
  customer: any;
  user_info: any;
  customer_info: any;
  modalValid = true;
  companies: any = [];
  companies_assigned: any = [];
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
  newCompany: any;
  currentUser: any;
  // Logo Url
  photoUrl: string;
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
    private http: Http,
    private router: Router,
    private roleService: RoleService,
    private companyService: CompanyService,
    private userService: UsersService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.customer = this.user.user;
    this.old_email = this.customer.email;
    this.user_info = this.user.user['user_info'];
    this.photoUrl = '/uploads/logo/' + this.customer.photo;
    this.customer_info = this.user.user.customer_info;
    this.companies_assigned = this.customer['companies_assigned'];
    this.companyService.getAllCompanies().then(res => {
      this.companies = res;
      for (let i = 0; i < this.companies.length; i++) {
        for (let j = 0; j < this.companies_assigned.length; j++) {
          if (this.companies[i]._id === this.companies_assigned[j]) {
            this.companies[i]['checked'] = true;
          }
        }
      }
    }, err => {
      console.log(err);
    });
    if (this.customer.special_permissions) {
      if (Object.keys(this.customer.special_permissions).length !== 0) {
        this.companyPermission = this.customer.special_permissions.company;
        this.staffPermission = this.customer.special_permissions.staff;
        this.customerPermission = this.customer.special_permissions.customer;
        this.orderPermission = this.customer.special_permissions.order;
        this.storePermission = this.customer.special_permissions.store;
        this.rolePermission = this.customer.special_permissions.role;
        this.home_url = this.customer.special_permissions.home_url;
        this.display_dashboard = this.customer.special_permissions.display_dashboard;
        this.send_remittance = this.customer.special_permissions.send_remittance;
      } else {
        this.initPermission();
      }
    } else {
      this.initPermission();
    }
    this.getAllRoles();
  }
  // init permission
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

  // Get Current Roles
  getAllRoles() {
    this.roleService.getAllRoles().then((res) => {
      this.roles = res;
    }, (err) => {
      console.log(err);
    });
  }

  selectCompany(event) {
    if (event.target.checked) {
      this.companies_assigned.push(event.target.value);
    } else {
      for (let i = 0; i < this.companies_assigned.length; i++) {
        if (event.target.value === this.companies_assigned[i]) {
          this.companies_assigned.splice(i, 1);
        }
      }
    }
  }

  onSubmit() {
    this.customer.username = this.customer.username.trim();
    this.customer.email = this.customer.email.trim();
    this.customer['user_info'] = this.user_info;
    this.customer['status'] = 'active';
    this.customer['accounttype'] = 'customer';
    this.customer['customer_info'] = this.customer_info;
    this.customer['companies_assigned'] = this.companies_assigned;
    if (this.photo) {
      this.uploadPhoto();
    }
    if (this.customer.role !== '') {
      delete this.customer.special_permissions;
    }
    this.userService.updateUser(this.customer.id, this.customer).then((result) => {
      if (!result['success']) {
        this.toastr.error('Sorry, cannot edit this user, please try again', '', this.toastr_options);
      } else {
        this.toastr.success('Success !!!', '', this.toastr_options);
        this.router.navigate(['/users']);
      }
    }, (err) => {
      console.log(err);
    });
  }
  cancel() {
    this.router.navigate(['/users']);
  }

  uploadPhoto() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToPhoto;
    formData.append('uploads[]', files[0], files[0]['name']);
    this.http.post('upload', formData)
    .map(res => res.json())
    .subscribe(res => console.log(res));
    this.customer['photo'] = files[0]['name'];
  }


  readPhoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.filesToPhoto = <Array<File>>event.target.files;
      this.photo = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event1: any) => {
        this.photoUrl = event1.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  savePermissions() {
    this.customer['special_permissions'] = {};
    this.customer.special_permissions.staff = this.staffPermission;
    this.customer.special_permissions.customer = this.customerPermission;
    this.customer.special_permissions.store = this.storePermission;
    this.customer.special_permissions.order = this.orderPermission;
    this.customer.special_permissions.company = this.companyPermission;
    this.customer.special_permissions.role = this.rolePermission;
    this.customer.special_permissions.display_dashboard = this.display_dashboard;
    this.customer.special_permissions.home_url = this.home_url;
    this.customer.special_permissions.send_remittance = this.send_remittance;
    this.customer.role = '';
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
