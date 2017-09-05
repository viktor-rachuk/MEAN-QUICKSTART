import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../../services/role.service';
import { UsersService } from '../../../../services/users.service';
import { StoresService } from '../../../../services/stores.service';
import { Staff } from './staff.interface';
// TO use jQuery and toastr jQuery Plugins
declare var $: any;
declare var toastr: any;


@Component({
  selector: 'staff-user',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})

export class StaffComponent implements OnInit {

  regionData = { 'Northland': ['Far North', 'Kaipara', 'Whangarei'],
  'Auckland': ['Auckland City', 'Franklin',
  'Hauraki Gulf Islands', 'Manukau City', 'North Shore City', 'Papakura', 'Rodney', 'Waiheke Island', 'Waitakere City'],
  'Bay Of Plenty': ['Kawerau', 'Opotiki', 'Rotorua', 'Tauranga', 'Wetern Bay Of Plenty', 'Whakatane'],
  'Coromandel': ['Thames-Coromandel'],
  'Waikato': ['Hamilton', 'Hauraki', 'Matamata-Piako', 'Otorohanga', 'South Waikato', 'Waikato', 'Waipa', 'Waitomo'],
  'Gisborne': ['Gisborne'],
  'Central North Island' : ['Ruapehu', 'Taupo'],
  'Hawkes Bay' : ['Central Hawkes Bay', 'Hastings', 'Napier City', 'Wairoa'],
  'Taranaki' : ['New Plymouth', 'South Taranaki', 'Stratford'],
  'Manawatu / Wanganui ': ['Horowhenua', 'Manawatu', 'Palmerston North City', 'Rangitikei', 'Tararua', 'Wanganui'],
  'Wairarapa': ['Carterton', 'Masterton', 'South Wairarapa'],
  'Wellington': ['Kapiti', 'Lower Hutt City', 'Porirua City', 'Upper Hutt City', 'Wellington City'],
  'Marlborough': ['Kaikoura', 'Marlborough'],
  'Nelson & Bays': ['Nelson', 'Tasman'],
  'West Coast': ['Buller', 'Grey', 'Westland'],
  'Canterbury': ['Ashburton', 'Banks Peninsula', 'Christchurch City',
  'Hurunui', 'Mackenzie', 'Selwyn', 'Timaru', 'Waimakariri', 'Waimate'],
  'Central Otago / Lakes District': ['Central Otago', 'Queenstown', 'Wanaka'],
  'Otago' : ['Clutha', 'Dunedin City', 'Waitaki'],
  'Southland' : ['Gore', 'Invercargill City', 'Southland']
};
regions = Object.keys(this.regionData);
cities: any;
stores: any;
stores_assigned = [];
staff: any;
parent: any;
child: any;
user_info: any;
customerPermission: any;
staffPermission: any;
storePermission: any;
orderPermission: any;
rolePermission: any;
companyPermission: any;
display_dashboard: any;
home_url: any;
roles = [];
user: any;
modalValid = true;
constructor (
  private router: Router,
  private roleService: RoleService,
  private userService: UsersService,
  private storeService: StoresService
) { }

ngOnInit() {
  // Get Current Logged in User
  this.user = JSON.parse(localStorage.getItem('user'));
  this.staff = {
    username: '',
    parent: '',
    password: '',
    company: '',
    role_name: '',
    special_permissions: {}
  };
  this.user_info = {
    phone: '',
    mobile: ''
  };
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
  // Get All Roles
  this.getAllRoles();
  // Get All Stores
  this.getAllStores();
  // Init UI elements
  toastr.options = {
    'debug': false,
    'newestOnTop': false,
    'positionClass': 'toast-bottom-right',
    'closeButton': true,
    'progressBar': true
  };
}

// Get Current Roles
getAllRoles() {
  this.roleService.getAllRoles().then((res) => {
    for (let i = 0; i < Object.keys(res).length; i++) {
      if (res[i].status === true) {
        this.roles.push(res[i]);
      }
    }
  }, (err) => {

    console.log(err);

  });
}

// Get All Stores
getAllStores() {
  this.storeService.getAllStores().then((res) => {
    this.stores = res;
  }, (err) => {
    console.log(err);
  });
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
  this.staff['user_info'] = this.user_info;
  this.staff['stores_assigned'] = this.stores_assigned;
  this.staff.user_info.phone = this.user_info.phone;
  this.staff.user_info.mobile = this.user_info.mobile;
  this.staff['status'] = 'active';
  this.staff['company'] = 'Carpet Court';
  this.staff['accounttype'] = 'staff';
  if (this.staff.role_name !== '') {
    console.log(this.staff);
  }
  this.userService.createNewUser(this.staff).then((result) => {
    if (!result['success']) {
      toastr.error(
        'Sorry,we cannot create a customer user right now,either the username or email address is currently being used for another user'
      );
    } else {
      toastr.success('Success - New Staff Created!!!');
      this.router.navigate(['/users']);
    }
  }, (err) => {
    console.log(err);
  });
}
cancel() {
  this.router.navigate(['/users']);
}
savePermissions() {
  this.staff.special_permissions.staff = this.staffPermission;
  this.staff.special_permissions.customer = this.customerPermission;
  this.staff.special_permissions.store = this.storePermission;
  this.staff.special_permissions.order = this.orderPermission;
  this.staff.special_permissions.company = this.companyPermission;
  this.staff.special_permissions.role = this.rolePermission;
  this.staff.special_permissions.display_dashboard = this.display_dashboard;
  this.staff.special_permissions.home_url = this.home_url;
  this.staff.role_name = '';
  this.modalValid = false;
}
}