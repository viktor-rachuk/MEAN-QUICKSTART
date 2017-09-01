import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VillagesService } from '../../../../services/villages.service';
import { UnittypesService } from '../../../../services/unittypes.service';
// TO use jQuery and toastr jQuery Plugins
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-createunit',
  templateUrl: './createunit.component.html',
  styleUrls: ['./createunit.component.css']
})
export class CreateunitComponent implements OnInit {


  villages: any;
  newUnitType: any;
  villages_assigned: any;
  constructor(
    private router: Router,
    private villagesService: VillagesService,
    private unittypesService: UnittypesService
  ) { }

  ngOnInit() {
    this.newUnitType = {
      name: '',
      status: ''
    }
    this.villages = [];
    this.villages_assigned = [];
    this.getAllVillages();
    // Init UI elements
    toastr.options = {
      "debug": false,
      "newestOnTop": false,
      "positionClass": "toast-bottom-right",
      "closeButton": true,
      "progressBar": true
    };
  }

  getAllVillages() {
    this.villagesService.getAllVils().then(
      res => {
        this.villages = res;
        },
      err => {
        console.log(err);
      });
  }

  selectVillage(event) {
    if (event.target.checked) {
      this.villages_assigned.push(event.target.value);
    } else {
      for (let i = 0; i < this.villages_assigned.length; i++) {
        if (this.villages_assigned[i] === event.target.value) {
          this.villages_assigned.splice(i, 1);
        }
      }
    }
  }

  save() {
    this.newUnitType.status = true;
    this.newUnitType.villages_assigned = this.villages_assigned;
    this.unittypesService.saveUnitType(this.newUnitType).then(
      res => {
         if (!res['success']) {
          toastr.error(' Sorry, unable to create a unittype right now, please try again soon');
        } else {
          toastr.success('Success !!!');
          this.router.navigate(['/uni-types']);
        }
      },
      err => {
        alert('Something went wrong!!!');
      }
    );
  }

  cancel() {
    this.router.navigate(['/uni-types']);
  }

}
