import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { VillagesService } from '../../../../services/villages.service';
//TO usejQuery and toastr jQuery Plugins
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-editvil',
  templateUrl: './editvil.component.html',
  styleUrls: ['./editvil.component.css']
})
export class EditvilComponent implements OnInit {
  
  village = {};
  constructor(
  		private route: ActivatedRoute,
	    private router: Router,
	    private villageService: VillagesService
  	) { }

  ngOnInit() {
  	this.getVillageDetails(this.route.snapshot.params['id']);
  	//Init UI elements 
    toastr.options = {
        "debug": false,
        "newestOnTop": false,
        "positionClass": "toast-bottom-right",
        "closeButton": true,
        "progressBar": true
    };
  }

  //Get Village Details

  getVillageDetails(id)  {
  	this.villageService.getVilDetails(id).then(
  		res => {  			
  			this.village = res;
  		},

  		err => {
  			console.log(err);
  		}
  	);
  }

  save() {
  	console.log(this.village);
  	this.villageService.updateVil(this.village["_id"], this.village).then (
  		res => {
         if(!res['success']) {
          toastr.error(' Sorry, unable to edit a village right now, please try again soon');
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
