import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { Http } from '@angular/http';
import { CompanyService } from '../../../services/company.service';
import { StoresService } from '../../../services/stores.service';
import { UsersService } from '../../../services/users.service';
import { RegionService } from '../../../services/region.service';
import { ToastrService } from 'ngx-toastr';
import { CurrentpermissionService } from '../../../services/currentpermission.service';


// TO use jQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'app-editcompany',
  templateUrl: './editcompany.component.html',
  styleUrls: ['./editcompany.component.css'],
})
export class EditcompanyComponent implements OnInit {
  filesToUpload: Array<File> = [];
  user: any;
  items: TreeviewItem[];
  currentCompany: any;
  company_info: any = {};
  account_info: any = {};
  address: any = {};
  companies: any = [];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    maxHeight: 400
  });
  company_permission: any;
  companies_structure = { // for display company structure
    'parent': '',
    'childs': []
  };
  child: any = {}; // for display company structure detail
  child_info: any = {};
  child_address: any = {};
  child_account: any = {};
  stores: any = [];
  logoUrl: string;
  users: any;
  logo: File;
  filesToLogo: Array<File> = [];
  logoChanged: boolean;
  assigned_staffs: any = [];
  assigned_stores: any = [];
  key_contacts: any = [];
  regionData: any = {};
  regions: any = [];
  cities: any = [];
  toastr_options = {
    'positionClass': 'toast-bottom-right',
    'closeButton': true,
    'progressBar': true
  };
  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private storesService: StoresService,
    private usersService: UsersService,
    private regionService: RegionService,
    private router: Router,
    private toastr: ToastrService,
    private http: Http,
    private permissionService: CurrentpermissionService
  ) {
    this.regionData = this.regionService.getRegionData();
    this.regions = Object.keys(this.regionData);
    this.user = JSON.parse(localStorage.getItem('user'));
    this.logoUrl = 'assets/images/default-logo.jpg';
    this.usersService.getAllStaffs().then(res => {
      this.users = res;
      // console.log(this.users);
    }, err => {
      console.log(err);
    });

    this.permissionService.getPermissions((permissions) => {
      this.company_permission = permissions.company;
      if (permissions.user_type !== 'super') {
        if (!this.company_permission.edit) {
          window.history.back();
          this.toastr.error('You have no permission to edit company!', 'Permission Error', this.toastr_options);
        }
      }
    });
    this.getAllCompanies();
  }

  ngOnInit() {
    this.currentCompany = {
      name: '',
      status: Boolean,
    };
    this.route.params.forEach(params => {
      const id = params['id'];
      // this.getCompanyDetails(this.route.snapshot.params['id']);
      this.getCompanyDetails(id);
    });
  }

  getAllCompanies() {
    this.companyService.getAllCompanies().then(res => {
      this.companies = res;
    }, err => {
      console.log(err);
    });
  }
  getCompanyDetails(id) {
    this.companyService.getCompanyDetail(id).then(
      res => {
        this.currentCompany = res;
        this.company_info = res['company_info'];
        this.account_info = res['account_info'];
        this.cities = this.regionData[this.company_info['region']];
        this.address = res['company_info'].address;
        this.logoUrl = '/uploads/logo/' + res['logo'];
        this.assigned_stores = res['assigned_stores'];
        this.key_contacts = res['key_contacts']; // currentcompany's key contacts table
        if (this.currentCompany.parent) {
          this.companyService.getCompanyStructure(this.currentCompany.parent).then(respond => {
            const item = new TreeviewItem(respond[0]);
            item['collapsed'] = false;
            const items = [];
            items.push(item);
            this.items = items;
          });
        }
        if (!this.currentCompany.parent) {
          this.companyService.getCompanyStructure(this.currentCompany._id).then(respond => {
            const item = new TreeviewItem(respond[0]);
            item['collapsed'] = false;
            const items = [];
            items.push(item);
            this.items = items;
          });
        }
        this.storesService.getAllStores().then(respond => {
          this.stores = respond;
          for ( let i = 0; i < this.stores.length; i++) {
            for ( let j = 0; j < this.assigned_stores.length; j++) {
              if ( this.stores[i]._id === this.assigned_stores[j]) {
                this.stores[i].checked = true;
              }
            }
          }
        }, error => {
          console.log(error);
        });
      },
      err => {
        console.error(err);
      }
    );
  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.filesToUpload = <Array<File>>event.target.files;
      this.logo = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event1: any) => {
        this.logoUrl = event1.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.logoChanged = true;
    }
  }
  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    formData.append('uploads[]', files[0], files[0]['name']);
    this.http.post('upload', formData)
      .map(res => res.json())
      .subscribe(res => console.log(res));
    this.currentCompany['logo'] = files[0]['name'];
  }
  selectStore(item, event) {
    if (event.target.checked) {
      const key = {
        store: item._id,
        key_staff: ''
      };
      this.assigned_stores.push(item._id);
      this.key_contacts.push(key);
    } else {
      for (let i = 0; i < this.assigned_stores.length; i++) {
        if (this.assigned_stores[i] === item._id) {
          this.assigned_stores.splice(i, 1);
        }
      }
      for (let i = 0; i < this.key_contacts.length; i++) {
        if (this.key_contacts[i].store === item._id) {
          this.key_contacts.splice(i, 1);
        }
      }
    }
  }

  // Select Region
  selectRegion(event) {
    const region = event.target.value;
    this.cities = this.regionData[region];
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
        this.child = this.companies[i];
        this.child_info = this.companies[i].company_info;
        this.child_address = this.companies[i].company_info.address;
        this.child_account = this.companies[i].account_info;
      }
    }
  }
  selectKeyContact(item, event) {
    const key_contact = {
      'store': item,
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
    console.log(this.key_contacts);
  }
  onSubmit() {
    if (this.logo) {
      this.upload();
    }
    this.companyService
      .updateCompany(this.currentCompany._id, this.currentCompany)
      .then(
        res => {
          if (!res['success']) {
            this.toastr.error(res['msg'], '', this.toastr_options);
          } else {
            this.toastr.success('Success !!!', '', this.toastr_options);
            this.router.navigate(['/companies']);
          }
        },
        err => {
          console.error(err);
        }
      );
  }

  cancel() {
    this.router.navigate(['/companies']);
  }
}
