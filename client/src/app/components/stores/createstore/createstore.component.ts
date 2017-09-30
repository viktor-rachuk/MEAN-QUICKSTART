import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../../services/stores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { RegionService } from '../../../services/region.service';
import { ToastrService } from 'ngx-toastr';
import { CurrentpermissionService } from '../../../services/currentpermission.service';

// To use jQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'app-createstore',
  templateUrl: './createstore.component.html',
  styleUrls: ['./createstore.component.css']
})
export class CreatestoreComponent implements OnInit {

  store: any;
  store_info: any;
  account_info: any;
  regionData: any = {};
  regions: any = [];
  cities: any = [];
  stores = [];
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private toastr: ToastrService,
  private storeService: StoresService,
  private regionService: RegionService,
  private permissionService: CurrentpermissionService
  ) {
  this.regionData = this.regionService.getRegionData();
  this.regions = Object.keys(this.regionData);
  this.permissionService.getPermissions((permissions) => {
    if (permissions.user_type !== 'super') {
      const store_permission = permissions.store;
      if (!store_permission.create) {
        window.history.back();
        this.toastr.error('You have no permission to create store!', 'Permission Error', this.toastr_options);
      }
    }
  });
}

ngOnInit() {
  this.store = {
    store_title: '',
    store_type: '',
    email: '',
    parent: '',
    child: [],
    status: Boolean
  };
  this.store_info = {
    phone: '',
    email: '',
    mobile: '',
    fax: '',
    address: {
      address1: '',
      address2: ''
    },
    city: '',
    region: '',
    postcode: '',
    country: ''
  };
  this.account_info = {
    bank_account: '',
    gst_number: '',
    payable_email: ''
  };
  this.getAllStores();
}

// Get All Stores
getAllStores() {
  this.storeService.getAllStores().then((res) => {
    // this.stores = res;
    for (let i = 0; i < Object.keys(res).length; i++) {
      this.stores.push(res[i]);
    }
  }, (err) => {
    console.error(err);
  });
}

// Select Region
selectRegion(event) {
  const region = event.target.value;
  this.cities = this.regionData[region];
}

// Create New Store
onSubmit() {
  this.store['store_info'] = this.store_info;
  this.store['account_info'] = this.account_info;
  this.store.status = true;
  this.storeService.saveStore(JSON.stringify(this.store)).then((result) => {
    if (!result['success']) {
      this.toastr.error('Sorry, cannot create new store, please try again', '', this.toastr_options);
    } else {
      this.toastr.success('Success !!!', '', this.toastr_options);
      this.router.navigate(['/stores']);
    }
  }, (err) => {
    console.log(err);
  });
}

// Cancel Store Create
cancel() {
  this.router.navigate(['/stores']);
}
}
