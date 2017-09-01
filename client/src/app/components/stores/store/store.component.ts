import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../../services/stores.service';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
// To use jQuery and toastr jQuery Plugins
declare var $: any;
declare var toastr: any;

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
  regionData = {'Northland': ['Far North', 'Kaipara', 'Whangarei'],
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
            'Canterbury': ['Ashburton', 'Banks Peninsula', 'Christchurch City', 'Hurunui',
            'Mackenzie', 'Selwyn', 'Timaru', 'Waimakariri', 'Waimate'],
            'Central Otago / Lakes District': ['Central Otago', 'Queenstown', 'Wanaka'],
            'Otago' : ['Clutha', 'Dunedin City', 'Waitaki'],
            'Southland' : ['Gore', 'Invercargill City', 'Southland']

  };
  regions = Object.keys(this.regionData);
  cities: any;
  stores = [];
  users = [];
  assigned_users: any;
  childs = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoresService,
    private usersService: UsersService
    ) { }

  ngOnInit() {
    this.getStore(this.route.snapshot.params['id']);
    // Init UI elements
    toastr.options = {
      'debug': false,
      'newestOnTop': false,
      'positionClass': 'toast-bottom-right',
      'closeButton': true,
      'progressBar': true
    };
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
      this.store_info = res['store_info'];
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
        toastr.error('Sorry, cannot edit this store, please try again');
      } else {
        toastr.success('Success !!!');
        this.router.navigate(['/stores']);
      }
    }, (err) => {
      console.log(err);
    });
  }

}
