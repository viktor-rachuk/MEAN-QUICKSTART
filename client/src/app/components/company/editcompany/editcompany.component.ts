import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { Http } from '@angular/http';
import { CompanyService } from '../../../services/company.service';
import { StoresService } from '../../../services/stores.service';
import { UsersService } from '../../../services/users.service';
// TO use jQuery and toastr jQuery Plugins
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-editcompany',
  templateUrl: './editcompany.component.html',
  styleUrls: ['./editcompany.component.css'],
})
export class EditcompanyComponent implements OnInit {
  filesToUpload: Array<File> = [];
  user; any;
  items: TreeviewItem[];
  currentCompany: any;
  company_info = {};
  account_info = {};
  address = {};
  companies: any;
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
  child = {}; // for display company structure detail
  child_info = {};
  child_address = {};
  child_account = {};
  stores: any;
  logoUrl: string;
  users: any;
  logo: File;
  filesToLogo: Array<File> = [];
  logoChanged: boolean;
  assigned_staffs = [];
  assigned_stores = [];
  key_contacts = [];
  regionData = {
    'Northland': ['Far North', 'Kaipara', 'Whangarei'],
    'Auckland': ['Auckland City', 'Franklin', 'Hauraki Gulf Islands',
    'Manukau City', 'North Shore City', 'Papakura', 'Rodney', 'Waiheke Island', 'Waitakere City'],
    'Bay Of Plenty': ['Kawerau', 'Opotiki', 'Rotorua',
    'Tauranga', 'Wetern Bay Of Plenty', 'Whakatane'],
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
    'Canterbury': ['Ashburton', 'Banks Peninsula',
    'Christchurch City', 'Hurunui', 'Mackenzie', 'Selwyn', 'Timaru', 'Waimakariri', 'Waimate'],
    'Central Otago / Lakes District': ['Central Otago', 'Queenstown', 'Wanaka'],
    'Otago' : ['Clutha', 'Dunedin City', 'Waitaki'],
    'Southland' : ['Gore', 'Invercargill City', 'Southland']
  };
  regions = Object.keys(this.regionData);
  cities: any;
  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private storesService: StoresService,
    private usersService: UsersService,
    private router: Router,
    private http: Http
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.special_permissions) {
      this.company_permission = this.user.special_permissions['company'];
    }
    if (this.user.role) {
      this.company_permission = this.user.special_permissions['company'];
    }
    this.logoUrl = 'assets/images/default-logo.jpg';
    this.usersService.getAllStaffs().then(res => {
      this.users= res;
      console.log(this.users);
    }, err => {
      console.log(err);
    });
    this.getAllCompanies();
  }

  ngOnInit() {
    this.currentCompany = {
      name: '',
      status: Boolean,
    };
    this.route.params.forEach(params => {
      let id = params['id'];
      // this.getCompanyDetails(this.route.snapshot.params['id']);
      this.getCompanyDetails(id);
    });
    // Init UI elements
    toastr.options = {
        'debug': false,
        'newestOnTop': false,
        'positionClass': 'toast-bottom-right',
        'closeButton': true,
        'progressBar': true
    };
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
          this.companyService.getCompanyStructure(this.currentCompany.parent).then(res => {
            const item = new TreeviewItem(res[0]);
            item['collapsed'] = false;
            const items = [];
            items.push(item);
            this.items = items;
          });
        }
        if (!this.currentCompany.parent) {
          this.companyService.getCompanyStructure(this.currentCompany._id).then(res => {
            const item = new TreeviewItem(res[0]);
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
            toastr.error(res['msg']);
          } else {
            toastr.success('Success !!!');
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
