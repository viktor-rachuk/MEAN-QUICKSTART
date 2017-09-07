import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../../services/stores.service';
import { CompanyService } from '../../../services/company.service';
import { UsersService } from '../../../services/users.service';
import { UnittypesService } from '../../../services/unittypes.service';
import { ColschemasService } from '../../../services/colschemas.service';
import { SendremittanceService } from '../../../services/sendremittance.service';


// TO usejQuery and toastr jQuery Plugins
declare var $: any;
declare var toastr: any;
declare var swal: any;

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.css']
})
export class CreateorderComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  users: any = [];
  stores: any = [];
  store = {};
  store_address = {};
  store_info = {};
  companies: any = [];
  company: any;
  company_info = {};
  assigned_stores = [];
  key_contact: any;
  key_staff = {};
  staff_info = {};
  unitTypes: any;
  colSchemas: any;
  staffs: any = [];
  areas_required = {
    'carpet': false,
    'kitchen': false,
    'bathroom': false,
    'laundry': false,
    'other': false
  };

  constructor (
    private storeService: StoresService,
    private companyService: CompanyService,
    private userService: UsersService,
    private unitTypeService: UnittypesService,
    private colSchemaService: ColschemasService,
    private sendRemittance: SendremittanceService
    ) {}

 ngOnInit() {
   this.getAllCompanies();
   // this.getAllStaffs();
   // this.getChildCompanies();
    // this.getAllCols();
    // this.getAllUnitTypes();
  }

  init() {
    this.store_address = {};
    this.company_info = {};
    this.key_staff = {};
    this.store = {};
    this.staff_info = {};
    this.assigned_stores = [];
  }

  // Get All Colours
  getAllCols() {
    this.colSchemaService.getAllCols().then(res => {
      this.colSchemas = res;
    }, err => {
      console.log(err);
    });
  }

  // Get All Unit Types
  getAllUnitTypes() {
    this.unitTypeService.getAllUnitTypes().then(res => {
      this.unitTypes = res;
    }, err => {
      console.log(err);
    });
  }

  // Get All Staffs
  getAllUsers() {
    this.userService.getAllUsers().then( res => {
      this.users = res;
      this.getAllStaffs();
    }, err => {
      console.log(err);
    });
  }
  // Get All Users
  getAllStaffs() {
    this.userService.getAllStaffs().then(res => {
      this.staffs = res;
      this.getChildCompanies();
      }, err => {
        console.log(err);
      });
  }
  getAssignedStores() {
    for (let i = 0; i < this.company['assigned_stores'].length; i ++) {
      for ( let j = 0; j < this.stores.length; j ++) {
        if (this.company['assigned_stores'][i] === this.stores[j]._id) {
          this.assigned_stores.push(this.stores[j]);
        }
      }
    }
    if (this.assigned_stores.length === 1) {
      this.store = this.assigned_stores[0];
      this.store_address = this.assigned_stores[0]['store_info'].address;
      this.store_info = this.assigned_stores[0]['store_info'];
      this.getKeyContact();
    }
  }
  // Get All Companies
  getAllCompanies() {
    this.companyService.getAllCompanies().then((res) => {
      this.companies = res;
     this.getAllStores();
    }, (err) => {
      console.log(err);
    });
  };
  getKeyContact() {
    const key_contact = this.company['key_contacts'][0];
    if (key_contact.store === this.store['_id']) {
      for (let i = 0; i < this.staffs.length; i ++) {
        if (this.staffs[i]._id === key_contact.key_staff) {
          this.key_staff = this.staffs[i];
          for (let j = 0; j < this.users.length; j ++) {
            if (this.users[j].username === this.key_staff['username'] ) {
              this.staff_info = this.users[j]['user_info'];
              this.staff_info['email'] = this.users[j]['email'];
            }
          }
        }
      }
    }
   }
   getChildCompanies() {
     if (this.user.accounttype === 'customer') {
       this.companyService.getAllChilds(this.user.companies_assigned).then(res => {
         const temp = [];
         const ids = this.user.companies_assigned.concat(res);
         for (let i = 0; i < this.companies.length; i++) {
           for (let j = 0; j < ids.length; j ++) {
             if ((this.companies[i]._id === ids[j]) && this.companies[i].is_debtor === true) {
               temp.push(this.companies[i]);
             }
           }
         }
         this.companies = temp;
         if (this.companies.length === 1) {
            this.company = temp[0];
            this.getAssignedStores();
          }
       });
     }
  }

  getAllStores() {
    this.storeService.getAllStores().then(res => {
      this.stores = res;
      this.getAllUsers();
    }, err => {
      console.log(err);
    });
  }

  selectCompany(event) {
    this.init();
    if (event.target.value) {
      this.assigned_stores = [];
      for (let i = 0; i < this.companies.length; i ++) {
        if (this.companies[i]._id === event.target.value) {
          this.company = this.companies[i];
          this.company_info = this.companies[i].company_info;
          this.getAssignedStores();
        }
      }
    } else {
      this.init();
    }
  }

  selectStore(event) {
    this.staff_info = {};
    this.key_staff = {};
    if (event.target.value) {
      for (let i = 0; i < this.stores.length; i++) {
        if (this.stores[i]._id === event.target.value) {
          this.store = this.stores[i];
          this.store_address = this.stores[i]['store_info'].address;
          this.store_info = this.stores[i]['store_info'];
        }
      }
      this.getKeyContact();

    } else {
      this.store = {};
      this.store_address = {};
      this.key_staff = {};
      this.staff_info = {};
    }
  }

  sendEmail() {
    swal({
      title: 'Are you sure?',
      text: 'You will Send Email to ' + this.store['email'],
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, please!',
      cancelButtonText: 'No, keep it'
    }).then(() => {
      const content = {};
      content['key_staff'] = this.key_staff;
      content['staff_info'] = this.staff_info;
      content['type'] = 'order';
      content['email'] = this.store['email'];
      this.sendRemittance.sendRemittance(content).then(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
      swal(
        'Sent Email Succesffully!',
        'Sent Email To ' + this.store['email'],
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
  selectEntireUnit() {
    this.areas_required = {
    'carpet': true,
    'kitchen': true,
    'bathroom': true,
    'laundry': true,
    'other': true
  };
}
}
