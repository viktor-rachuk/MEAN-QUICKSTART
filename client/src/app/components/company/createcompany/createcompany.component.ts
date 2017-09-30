import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { CompanyService } from '../../../services/company.service';
import { StoresService } from '../../../services/stores.service';
import { UsersService } from '../../../services/users.service';
import { RegionService } from '../../../services/region.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CurrentpermissionService } from '../../../services/currentpermission.service';

import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.css']
})
export class CreatecompanyComponent implements OnInit {
  company: any = {};
  user: any;
  company_info: any = {};
  account_info: any = {};
  address: any = {};
  companies: any = [];
  items: TreeviewItem[];
  stores: any = [];
  logoUrl: string;
  companies_structure = { // for display company structure
    'parent': '',
    'childs': []
  };
  child: any = {}; // for display company structure detail
  child_info: any = {};
  child_address: any = {};
  child_account: any = {};
  logo: File;
  filesToLogo: Array<File> = [];
  logoChanged: boolean;
  assigned_staffs = [];
  assigned_stores = [];
  key_contacts = [];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    maxHeight: 400
  });
  company_permission: any;
  parent: any;
  regionData: any = {};
  regions: any = [];
  cities: any = [];
  toastr_options = {
        'positionClass': 'toast-bottom-right',
        'closeButton': true,
        'progressBar': true
  };
  constructor(
    private http: Http,
    private companyService: CompanyService,
    private storeService: StoresService,
    private userService: UsersService,
    private regionService: RegionService,
    private toastr: ToastrService,
    private router: Router,
    private permissionService: CurrentpermissionService
  ) {
    this.regionData = this.regionService.getRegionData();
    this.regions = Object.keys(this.regionData);
    this.user = JSON.parse(localStorage.getItem('user'));
    this.permissionService.getPermissions((permissions) => {
      this.company_permission = permissions.company;
      if (permissions.user_type !== 'super') {
        if (!this.company_permission.create) {
          window.history.back();
          this.toastr.error('You have no permission to create company!', 'Permission Error', this.toastr_options);
        }
      }
    });
   }
  ngOnInit() {
    this.company = {
      'name': '',
      'email': '',
      'is_debtor': false
    };
    this.address = {
      'address1': '',
      'address2': ''
    };
    this.logoUrl = 'assets/images/default-logo.jpg';
    this.getAllCompanies();
    this.getAllStores();
  }
  // Get All Companies
  getAllCompanies() {
    this.companyService.getAllCompanies().then(res => {
      this.companies = res;
      const parents = [];
      for (let i = 0; i < this.companies.length; i ++) {
        if (!this.companies[i].parent) {
          parents.push(this.companies[i].name);
        }
      }
      // console.log(parents);
    }, err => {
      console.log(err);
    });
  }
  // Get All Stores
  getAllStores() {
    this.storeService.getAllStores().then(res => {
      this.stores = res;
    }, err => {
      console.log(err);
    });
  }
  selectStore(store, event) {
    if (event.target.checked) {
      this.assigned_stores.push(store._id);
      const assigned_staffs = store.assigned_users;
      this.userService.getAllStaffs().then(res => {
        const temp = [];
        for ( let i = 0; i < Object.keys(res).length; i++) {
          for (let j = 0; j < assigned_staffs.length; j++) {
            if (res[i]._id === assigned_staffs[j]) {
              temp.push({ 'id': res[i]._id, 'username': res[i].username});
            }
          }
        }
        const key = {
          'store_id': store._id,
          'store': store.store_title,
          'assigned_staffs': temp
        };
        console.log(key);
        this.assigned_staffs.push(key);
      }, err => {
        console.log(err);
      });
    } else {
      for (let  i = 0; i < this.assigned_staffs.length; i++) {
        if (this.assigned_staffs[i].store === store.store_title) {
          this.assigned_staffs.splice(i, 1);
        }
      }
      for (let i = 0; i < this.assigned_stores.length; i++) {
        if (this.assigned_stores[i] === store.id) {
          this.assigned_stores.splice(i, 1);
        }
      }
    }
  }
  selectParent (event) { // select parent company, and add this company to company structure
    if (event.target.value.length !== 0) {
      this.companyService.getCompanyStructure(event.target.value).then(res => {
        const item = new TreeviewItem(res[0]);
        item['collapsed'] = false;
        const items = [];
        items.push(item);
        this.items = items;
      }, err => {
        console.log(err);
      });
    }
  }

  selectChild (event) {
    for (let i = 0; i < this.companies.length; i ++) {
      if (this.companies[i].name === event) {
        // console.log(this.companies[i]);
        this.child = this.companies[i];
        this.child_info = this.companies[i].company_info;
        this.child_address = this.companies[i].company_info.address;
        this.child_account = this.companies[i].account_info;
      }
    }
  }
  selectKeyContact (item, event) {
    const key_contact = {
      'store': item.store_id,
      'key_staff': event.target.value
    };
    let already_existed = false;
    for (let i = 0; i < this.key_contacts.length; i++) {
      if (this.key_contacts[i].store === key_contact.store) {
        already_existed = true;
        this.key_contacts[i] = key_contact;
      }
    }
    if (!already_existed) {
      this.key_contacts.push(key_contact);
    }
  }
  // Select Region
  selectRegion(event) {
    const region = event.target.value;
    this.cities = this.regionData[region];
  }
  isDebtor(event) {
    if (event.target.checked) {
      this.company['is_debtor'] = true;
    } else {
      this.company['is_debtor'] = false;
    }
  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.filesToLogo = <Array<File>>event.target.files;
      this.logo = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event1: any) => {
        this.logoUrl = event1.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.logoChanged = true;
    }
  }
  uploadLogo() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToLogo;
    formData.append('uploads[]', files[0], files[0]['name']);
    this.http.post('upload', formData)
    .map(res => res.json())
    .subscribe(res => console.log(res));
    this.company['logo'] = files[0]['name'];
  }
  onSubmit() {
    this.company_info['address'] = this.address;
    this.company['company_info'] = this.company_info;
    this.company['account_info'] = this.account_info;
    this.company['key_contacts'] = this.key_contacts;
    this.company['assigned_stores'] = this.assigned_stores;
    if (this.logoChanged) {
      this.uploadLogo();
    }
    this.companyService.createCompany(this.company).then(res => {
      if (res['success'] === true) {
        this.toastr.success(res['msg'], '', this.toastr_options);
        this.router.navigate(['/companies']);
      } else {
        this.toastr.error(res['msg'], '', this.toastr_options);
      }
    }, err => {
      console.log('Something went wrong!!!-->' + err);
    });
  }

  cancel() {
    this.router.navigate(['/companies']);
  }

}
