import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VillagesService } from '../../../../services/villages.service';
// TO use jQuery and toastr jQuery Plugins
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-createvil',
  templateUrl: './createvil.component.html',
  styleUrls: ['./createvil.component.css']
})
export class CreatevilComponent implements OnInit {

  village: any;

  constructor(private router: Router, private villagesServices: VillagesService) { }

  ngOnInit() {
  	// Init UI elements
    toastr.options = {
        "debug": false,
        "newestOnTop": false,
        "positionClass": "toast-bottom-right",
        "closeButton": true,
        "progressBar": true
    };
    this.village = {
      name: '',
      status: ''
    };
  }

  save() {
    this.village.status = true;
    this.villagesServices.saveVil(this.village).then(
      res => {
         if (!res['success']) {
          toastr.error(' Sorry, unable to create a village right now, please try again soon');
        } else {
          toastr.success('Success !!!');
          this.router.navigate(['/vils']);
        }
      },
      err => {
        alert('Something went wrong!!!');
      }
    );
  }
  cancel() {
    this.router.navigate(['/vils']);
  }

}
