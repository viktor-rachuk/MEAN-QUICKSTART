import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../../services/stores.service';
import { UsersService } from '../../../services/users.service';
import { RegionService } from '../../../services/region.service';
import { ToastrService } from 'ngx-toastr';
import { CurrentpermissionService } from '../../../services/currentpermission.service';

import { ActivatedRoute, Router } from '@angular/router';
// To use jQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  store: any = {};
  store_info: any = {};
  account_info: any = {};
  address: any = {};
  regionData: any = {};
  regions: any = [];
  cities: any = [];
  stores = [];
  users = [];
  assigned_users: any;
  childs = [];
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
    private usersService: UsersService,
    private permissionService: CurrentpermissionService
    ) {
    this.regionData = this.regionService.getRegionData();
    this.regions = Object.keys(this.regionData);
    this.permissionService.getPermissions((permissions) => {
      if (permissions.user_type !== 'super') {
        const store_permission = permissions.store;
        if (!store_permission.edit) {
          window.history.back();
          this.toastr.error('You have no permission to edit store!', 'Permission Error', this.toastr_options);
        }
      }
    });
  }

  ngOnInit() {
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
    this.getStore(this.route.snapshot.params['id']);
    this.getAllStores();
  }
  // Get All Stores
  getAllStores() {
    this.storeService.getAllStores().then((res) => {
      // this.stores = res;
      for (let i = 0; i < Object.keys(res).length; i++) {
        if (res[i]._id !== this.store._id) {
          this.stores.push(res[i]);
        }
      }
    }, (err) => {
      console.error(err);
    });
  }
  selectRegion(event) {
    const region = event.target.value;
    this.cities = this.regionData[region];
  }
  getStore(id) {
    this.storeService.getStore(id).then((res) => {
      this.store = res;
      this.store_info = Object.assign(this.store_info, res['store_info']);
      this.account_info = res['account_info'];
      this.address = this.store_info['address'];
      this.cities = this.regionData[this.store_info.region];
      this.childs = res['child'];
      this.assigned_users = res['assigned_users'];
      this.usersService.getAllStaffs().then(response => {
        for ( let i = 0; i < Object.keys(response).length; i++) {
          for ( let j = 0; j < this.assigned_users.length; j++) {
            if ( response[i]._id === this.assigned_users[j]) {
              this.users.push(response[i]);
            }
          }
        }
      }, error => {
        console.log(error);
      });
    }, (err) => {
      console.log(err);
    });
  }
  cancel() {
    this.router.navigate(['/stores']);
  }
  onSubmit() {
    this.store_info['address'] = this.address;
    this.store['store_info'] = this.store_info;
    this.storeService.updateStore(this.store['_id'], JSON.stringify(this.store)).then((result) => {
      if (!result['success']) {
        this.toastr.error('Sorry, cannot edit this store, please try again', '', this.toastr_options);
      } else {
        this.toastr.success('Success !!!', '', this.toastr_options);
        this.router.navigate(['/stores']);
      }
    }, (err) => {
      console.log(err);
    });
  }

}
