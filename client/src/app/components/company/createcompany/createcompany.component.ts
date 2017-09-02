import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { CompanyService } from '../../../services/company.service';
import { StoresService } from '../../../services/stores.service';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.css']
})
export class CreatecompanyComponent implements OnInit {
  company = {};
  user: any;
  company_info = {};
  account_info = {};
  address = {};
  companies: any;
  items: TreeviewItem[];
  stores: any;
  logoUrl: string;
  companies_structure = { // for display company structure
    'parent': '',
    'childs': []
  };
  child = {}; // for display company structure detail
  child_info = {};
  child_address = {};
  child_account = {};
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
  regionData = {
    'Northland': ['Far North', 'Kaipara', 'Whangarei'],
    'Auckland': ['Auckland City', 'Franklin', 'Hauraki Gulf Islands', 'Manukau City',
    'North Shore City', 'Papakura', 'Rodney', 'Waiheke Island', 'Waitakere City'],
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
  constructor(
    private http: Http,
    private companyService: CompanyService,
    private storeService: StoresService,
    private userService: UsersService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.special_permissions) {
      this.company_permission = this.user.special_permissions['company'];
    }
    if (this.user.role) {
      this.company_permission = this.user.special_permissions['company'];
    }
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
    // Init UI elements
    toastr.options = {
        'debug': false,
        'newestOnTop': false,
        'positionClass': 'toast-bottom-right',
        'closeButton': true,
        'progressBar': true
    };
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
      console.log(parents);
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
        console.log(this.companies[i]);
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
        toastr.success(res['msg']);
        this.router.navigate(['/companies']);
      } else {
        toastr.error(res['msg']);
      }
    }, err => {
      console.log('Something went wrong!!!-->' + err);
    });
  }

  cancel() {
    this.router.navigate(['/companies']);
  }

}
