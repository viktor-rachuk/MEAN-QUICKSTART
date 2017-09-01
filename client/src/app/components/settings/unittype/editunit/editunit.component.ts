import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VillagesService } from '../../../../services/villages.service';
import { UnittypesService } from '../../../../services/unittypes.service';
// TO use jQuery and toastr jQuery Plugins
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-editunit',
  templateUrl: './editunit.component.html',
  styleUrls: ['./editunit.component.css']
})
export class EditunitComponent implements OnInit {
  unitType: any = {};
  villages: any = [];
  villages_assigned: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private villagesService: VillagesService,
    private unittypesService: UnittypesService
  ) {}

  ngOnInit() {
    this.getUnitTypeDetails(this.route.snapshot.params['id']);
    // Init UI elements
    toastr.options = {
      'debug': false,
      'newestOnTop': false,
      'positionClass': 'toast-bottom-right',
      'closeButton': true,
      'progressBar': true
    };
  }
  getUnitTypeDetails(id) {
    this.unittypesService.getUnitTypeDetails(this.route.snapshot.params['id']).then(

      res => {
        this.unitType = res;
        this.villages_assigned = res['villages_assigned'];
        this.villagesService.getAllVils().then(
          respond => {
            this.villages = respond;
            for ( let i = 0; i < this.villages.length; i++) {
              for ( let j = 0; j < this.villages_assigned.length; j++) {
                if ( this.villages[i]._id === this.villages_assigned[j]) {
                  this.villages[i].checked = true;
                }
              }
            }
          },
          error => {
            console.log(error);
          }
        );
      }, err => {
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
      this.unitType['villages_assigned'] = this.villages_assigned;
      this.unittypesService.updateUnitType(this.unitType['_id'], this.unitType).then(
        res => {
          if ( !res['success'] ) {
            toastr.error(' Sorry, unable to edit a unit type right now, please try again soon');
          } else {
            toastr.success('Success !!!');
            this.router.navigate(['/uni-types']);
          }
        },
        err => {
          console.log(err);
        });
      }
      cancel() {
        this.router.navigate(['/uni-types']);
      }
    }
