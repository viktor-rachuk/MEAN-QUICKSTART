import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { StoresService } from '../../../services/stores.service';
import { CompanyService } from '../../../services/company.service';
import { UsersService } from '../../../services/users.service';
import { UnittypesService } from '../../../services/unittypes.service';
import { ColschemasService } from '../../../services/colschemas.service';
import { SendremittanceService } from '../../../services/sendremittance.service';
import { CurrentpermissionService } from '../../../services/currentpermission.service';
import { ToastrService } from 'ngx-toastr';

import swal from 'sweetalert2';

// TO usejQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.css']
})
export class CreateorderComponent implements AfterViewInit {
  @ViewChild('datepicker1') el1: ElementRef;
  @ViewChild('datepicker2') el2: ElementRef;
  public loading = false;
  user = JSON.parse(localStorage.getItem('user'));
  users: any = [];
  stores: any = [];
  store: any = {};
  store_address: any = {};
  store_info: any = {};
  companies: any = [];
  company: any;
  company_info: any = {};
  assigned_stores: any = [];
  key_contact: any;
  key_staff: any = {};
  staff_info: any = {};
  unitTypes: any;
  colSchemas: any;
  staffs: any = [];
  areas_required = {
    'entire': false,
    'carpet': false,
    'kitchen': false,
    'bathroom': false,
    'laundry': false,
    'other': false
  };
  support = '';
  visible_special = false;
  client_info: any = {};
  contractor_info: any = {};
  project_detail = {
    colour_scheme: '',
    install_date: '',
    order_date: '',
    order_number: '',
    plan_type: '',
    quote: true,
    unit_number: '',
    unit_type: '',
    special: ''
  };
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor (
    private http: Http,
    private storeService: StoresService,
    private companyService: CompanyService,
    private userService: UsersService,
    private unitTypeService: UnittypesService,
    private colSchemaService: ColschemasService,
    private sendRemittance: SendremittanceService,
    private toastr: ToastrService,
    private permissionService: CurrentpermissionService
    ) {
    this.permissionService.getPermissions((permissions) => {
      if (permissions.user_type !== 'super') {
        const order_permission = permissions.order;
        if (!order_permission.create) {
          window.history.back();
          this.toastr.error('You have no permission to create order!', 'Permission Error', this.toastr_options);
        }
      }
    });
  }

  ngAfterViewInit() {
    $(this.el1.nativeElement).datepicker({ dateFormat: 'dd/mm/yy' });
    $(this.el2.nativeElement).datepicker({ dateFormat: 'dd/mm/yy' });
    $(this.el1.nativeElement).on('change', (e) => {
      this.orderDateChange(e);
    });
    $(this.el2.nativeElement).on('change', (e) => {
      this.installDateChange(e);
    });
    const headers = new Headers();
    const authToken = localStorage.getItem('id_token');
    headers.append('Authorization', authToken);
    headers.append('Content-Type', 'application/json');
    const companies = this.http.get('/companies').map(res => res.json());
    const stores = this.http.get('/stores').map(res => res.json());
    const users = this.http.get('/users', {headers: headers}).map(res => res.json());
    const staffs = this.http.post('/users/staffs', {headers: headers}).map(res => res.json());
    Observable.forkJoin([companies, stores, staffs, users]).subscribe(results => {
      this.companies = results[0];
      this.staffs = results[2];
      this.stores = results[1];
      this.users = results[3];
      this.stores.forEach((store) => {
        if (store.store_type === 'support_office') {
          this.support = store.email;
        };
      });
      this.initCompany();
    });
  }

  init() {
    this.store_address = {};
    this.company_info = {};
    this.key_staff = {};
    this.store = {};
    this.staff_info = {};
    this.assigned_stores = [];
  }
  initCompany() {
    if (this.user.accounttype === 'super' || this.user.accounttype === 'staff') {
      if (this.companies.length === 1) {
        this.company = this.companies[0];
        this.initStore(this.company);
      }
    } else {
      const companies_assigned = this.user.companies_assigned;
      this.loading = true;
      this.companyService.getAllChilds(companies_assigned).then(res => {
        this.loading = false;
        const temp = [];
        const ids = companies_assigned.concat(res);
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
          this.initStore(this.company);
        }
      });
    }
  }

  initStore(company) {
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
      console.log(this.store);
      this.contractor_info['store'] = this.store['store_title'];
      this.contractor_info['store_email'] = this.store['email'];
      this.contractor_info['info'] = this.store_info;
      this.initKeyContact();
    }
  }

  initKeyContact() {
    const key_contact = this.company['key_contacts'][0];
    if (key_contact.store === this.store['_id']) {
      for (let i = 0; i < this.staffs.length; i ++) {
        if (this.staffs[i]._id === key_contact.key_staff) {
          this.key_staff = this.staffs[i];
          this.contractor_info['staff'] = this.staffs[i].username;
          for (let j = 0; j < this.users.length; j ++) {
            if (this.users[j].username === this.key_staff['username'] ) {
              this.staff_info = this.users[j]['user_info'];
              this.staff_info['email'] = this.users[j]['email'];
              this.contractor_info['email'] = this.users[j]['email'];
              this.contractor_info['phone'] = this.users[j]['user_info'].phone;
              this.contractor_info['mobile'] = this.users[j]['user_info'].mobile;
            }
          }
        }
      }
    }
  }
  selectCompany(event) {
    this.init();
    if (event.target.value !== '') {
      this.assigned_stores = [];
      for (let i = 0; i < this.companies.length; i ++) {
        if (this.companies[i]._id === event.target.value) {
          this.company = this.companies[i];
          this.company_info = this.companies[i].company_info;
          this.client_info['village'] = this.company.name;
          this.initStore(this.company);
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
          this.contractor_info['store'] = this.store['store_title'];
          this.contractor_info['store_email'] = this.store['email'];
          this.contractor_info['info'] = this.store_info;
        }
      }
      this.initKeyContact();

    } else {
      this.store = {};
      this.store_address = {};
      this.key_staff = {};
      this.staff_info = {};
      this.contractor_info['store'] = '';
      this.contractor_info['address'] = {};
      this.contractor_info['info'] = {};
      this.contractor_info['store_email'] = '';
    }
  }

  sendEmail() {
    const content = {
      'sender_email': '',
      'staff_email': '',
      'store_email': '',
      'client_info': {},
      'contractor_info': {},
      'project_detail': {},
      'areas': {},
      'user': '',
      'created_at': ''
    };
    this.client_info['name'] = this.user.username;
    this.client_info['email'] = this.user.email;
    if (this.user.accounttype !== 'super') {
      this.client_info['phone'] = this.user.user_info.phone;
      this.client_info['mobile'] = this.user.user_info.mobile;
    } else {
      this.client_info['phone'] = '';
      this.client_info['mobile'] = '';
    }
    if (this.companies.length === 1) {
      this.client_info['village'] = this.companies[0].name;
    }
    content['sender_email'] = this.user.email;
    content['staff_email'] = this.contractor_info['email'];
    content['store_email'] = this.contractor_info['store_email'];
    content['client_info'] = this.client_info;
    content['contractor_info'] = this.contractor_info;
    content['project_detail'] = this.project_detail;
    content['areas'] = this.areas_required;
    content['user'] = this.user.username;
    content['accounttype'] = this.user.accounttype;
    createdAt((created_at) => {
      content['created_at'] = created_at;
    });
    swal({
      title: 'Send this order? ',
      html: 'A notification will be sent to ' + '<br>' + this.user.email
      + '<br>' + this.contractor_info['email']
       + '<br>' + this.contractor_info['store_email'],
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, please!',
      cancelButtonText: 'No, not yet'
    }).then(() => {
      swal(
        {
          title: 'Order sent successfully!',
          html: 'Notification of this order has been sent to' + '<br>' + this.user.email + '<br>' + this.contractor_info['email']
        }
      );
      console.log(content);
      this.sendRemittance.sendOrderEmail(content).then(res => {
        if (res['success']) {
          this.toastr.success('Sent order email successfully!', 'Success', this.toastr_options);
        } else {
          this.toastr.error('Failed to send order email!', 'Error', this.toastr_options);
        }
      }, err => {
        console.log(err);
      });
    }, (dismiss) => {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your imaginary order is safe :)',
          'error'
          );
      }
    });
  }

  selectArea(event) {
    if (event.target.checked) {
      if (event.target.value === 'carpet') {
        this.areas_required.carpet = true;
      } else if (event.target.value === 'kitchen') {
        this.areas_required.kitchen = true;
      } else if (event.target.value === 'bathroom') {
        this.areas_required.bathroom = true;
      } else if (event.target.value === 'laundry') {
        this.areas_required.laundry = true;
      } else if (event.target.value === 'entire') {
        this.areas_required['entire'] = true;
        this.areas_required['carpet'] = true;
        this.areas_required['kitchen'] = true;
        this.areas_required['bathroom'] = true;
        this.areas_required['laundry'] = true;
      } else if (event.target.value === 'other') {
        this.visible_special = true;
        this.areas_required['other'] = true;
      }
    } else {
      if (event.target.value === 'carpet') {
        this.areas_required.carpet = false;
      } else if (event.target.value === 'kitchen') {
        this.areas_required.kitchen = false;
      } else if (event.target.value === 'bathroom') {
        this.areas_required.bathroom = false;
      } else if (event.target.value === 'laundry') {
        this.areas_required.laundry = false;
      } else if (event.target.value === 'entire') {
        this.areas_required['entire'] = false;
        this.areas_required['carpet'] = false;
        this.areas_required['kitchen'] = false;
        this.areas_required['bathroom'] = false;
        this.areas_required['laundry'] = false;
      } else if (event.target.value === 'other') {
        this.visible_special = false;
        this.areas_required['other'] = false;
      }
    }
  };

  selectQuote(value) {
    if (value === 1) {
      this.project_detail['quote'] = true;
    } else {
      this.project_detail['quote'] = false;
    }
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

  orderDateChange(event) {
    this.project_detail['order_date'] = event.target.value;
  }

  installDateChange(event) {
    this.project_detail['install_date'] = event.target.value;
  }
}

function createdAt(callback) {
  const today = new Date();
  const date = today.getDate() + '/' + (today.getMonth() + 1 ) + '/' + today.getFullYear();
  const time = today.toLocaleString('en-NZ', { hour: 'numeric', minute : 'numeric', hour12: true });
  const created_at = time + '  ' + date;
  return callback(created_at);
}
