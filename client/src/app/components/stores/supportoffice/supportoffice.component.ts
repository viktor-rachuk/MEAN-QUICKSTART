import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../../services/stores.service';
import { ToastrService } from 'ngx-toastr';

// To use jQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'app-supportoffice',
  templateUrl: './supportoffice.component.html',
  styleUrls: ['./supportoffice.component.css']
})
export class SupportofficeComponent implements OnInit {

  office: any = {};
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(private storeService: StoresService, private toastr: ToastrService) { }

  ngOnInit() {
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
        this.toastr.error('Sorry, cannot edit this store, please try again', '', this.toastr_options);
      } else {
        this.toastr.success('Success !!!', '', this.toastr_options);
        window.history.back();
      }
    }, (err) => {
      console.log(err);
    });
  }

}
