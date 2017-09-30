import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { StoresService } from '../../services/stores.service';
import { CompanyService } from '../../services/company.service';
import { UsersService } from '../../services/users.service';
import { RegionService } from '../../services/region.service';
import { CurrentpermissionService } from '../../services/currentpermission.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  public loading = false;
  stores: any;
  store_info: any;
  user: any;
  store_permission: any;
  location: Location;
  selectedStores: any;
  filteredStores: any;
  filterRegion: any;
  filterCity: any;
  regionData: any = {};
  regions: any = [];
  cities: any = [];
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
constructor(
  private storeService: StoresService,
  private userService: UsersService,
  private companyService: CompanyService,
  private regionService: RegionService,
  private toastr: ToastrService,
  private permissionService: CurrentpermissionService,

  ) {
  this.regionData = this.regionService.getRegionData();
  this.regions = Object.keys(this.regionData);
  this.user = JSON.parse(localStorage.getItem('user'));
    this.permissionService.getPermissions((permissions) => {
      this.store_permission = permissions.store;
    if (permissions.user_type !== 'super') {
      if (!this.store_permission.create && !this.store_permission.edit && !this.store_permission.delete && !this.store_permission.view) {
        window.history.back();
        this.toastr.error('You have no permission to access stores!', 'Permission Error', this.toastr_options);
      }
    }
  });
}

ngOnInit() {
  this.stores = [];
  this.selectedStores = [];
  this.getAllStores();
}

getAllStores() {
  this.loading = true;
  this.storeService.getAllStores().then((res) => {
    this.loading = false;
    this.stores = res;
    this.filteredStores = this.stores;
    if (this.user.accounttype === 'customer') {
      this.loading = true;
      this.userService.getUserDetails(this.user.id).then(user => {
        this.companyService.getAllChilds(user['user'].companies_assigned).then(child_companies => {
          const total_companies = user['user'].companies_assigned.concat(child_companies);
          this.companyService.getAllCompanies().then(all_companies => {
            this.loading = false;
            const assigned_stores = [];
            for (let i = 0; i < Object.keys(all_companies).length; i ++) {
              for (let j = 0; j < total_companies.length; j ++) {
                if (all_companies[i]._id === total_companies[j]) {
                  if (all_companies[i].assigned_stores.length !== 0) {
                    for (let k = 0; k < all_companies[i].assigned_stores.length; k ++) {
                      assigned_stores.push(all_companies[i].assigned_stores[k]);
                    }
                  }
                }
              }
            }
            const temp = Array.from(new Set(assigned_stores));
            const stores = [];
            for (let i = 0; i < Object.keys(this.stores).length; i ++) {
              for (let j = 0; j < temp.length; j ++) {
                if (this.stores[i]._id.toString() === temp[j]) {
                  stores.push(this.stores[i]);
                }
              }
            }
            this.stores = [];
            this.stores = stores;
            this.filteredStores = stores;
          }, err_all_companies => {
            this.loading = false;
            console.log(err_all_companies);
          });
        }, error_companies => {
          this.loading = false;
          console.log(error_companies);
        });
      }, error => {
        console.log(error);
      });
    }
  }, (err) => {
    this.loading = false;
    console.log(err);
  });
}
selectRegion(event) {
  const region = event.target.value;
  this.cities = this.regionData[region];
  const temp = [];
  if (region === '') {
    this.filteredStores = this.stores;
  } else {
    for (let i = 0; i < this.stores.length; i++) {
      if (this.stores[i].store_info.region === region) {
        temp.push(this.stores[i]);
      }
    }
    this.filteredStores = temp;
  }

}

selectCity(event) {
  const city = event.target.value;
  const temp = [];
  if (city === '') {
    if (this.filterRegion === '') {
      this.filteredStores = this.stores;
    } else {
      for (let i = 0; i < this.stores.length; i++) {
        if (this.stores[i].store_info.region === this.filterRegion) {
          temp.push(this.stores[i]);
        }
      }
      this.filteredStores = temp;
    }
  } else {
    for (let i = 0; i < this.stores.length; i++) {
      if (this.stores[i].store_info.city === city) {
        temp.push(this.stores[i]);
      }
    }
    this.filteredStores = temp;
  }
}
selectElement(event) {
  if (event.target.checked) {
    this.selectedStores.push(event.target.value);
  } else {
    this.selectedStores.splice(this.selectedStores.indexOf(event.target.value), 1);
  }
}

deleteStores() {
  swal({
    title: 'Are you sure?',
    text: 'You will not be able to recover selected stores!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then(() => {
    this.storeService.deleteStore(this.selectedStores).then((res) => {
      this.selectedStores = [];
      this.getAllStores();
      if (JSON.parse(res['_body']).success) {
        swal(
          'Deleted!',
          'Selected stores has been deleted.',
          'success'
          );
      } else {
        swal(
          'Error!',
          'Cannot delete selected stores!',
          'error'
          );
      }
    }, (err) => {
      console.error(err);
    });
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

deactivateStores() {
  this.storeService.deactivateStore(this.selectedStores).then((res) => {
    this.getAllStores();
  }, (err) => {
    console.error(err);
  });
}

reactivateStores() {
  this.storeService.reactivateStore(this.selectedStores).then((res) => {
    this.getAllStores();
  }, (err) => {
    console.error(err);
  });
}
}
