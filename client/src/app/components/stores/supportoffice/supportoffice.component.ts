import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../../services/stores.service';
// To use jQuery and toastr jQuery Plugins
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-supportoffice',
  templateUrl: './supportoffice.component.html',
  styleUrls: ['./supportoffice.component.css']
})
export class SupportofficeComponent implements OnInit {

  office: any = {};

  constructor(private storeService: StoresService) { }

  ngOnInit() {
  	// Init UI elements
    toastr.options = {
      'debug': false,
      'newestOnTop': false,
      'positionClass': 'toast-bottom-right',
      'closeButton': true,
      'progressBar': true
    };
    this.getSupportOffice();
  }

  getSupportOffice() {
    this.storeService.getSupportOffice().then(res => {
      this.office = res;
    }, err => {
      console.log(err);
    });
  }

  cancel() {
    window.history.back();
  }
  onSubmit() {
    this.storeService.updateStore(this.office['_id'], JSON.stringify(this.office)).then((result) => {
      if (!result['success']) {
        toastr.error('Sorry, cannot edit this store, please try again');
      } else {
        toastr.success('Success !!!');
        window.history.back();
      }
    }, (err) => {
      console.log(err);
    });
  }

}
