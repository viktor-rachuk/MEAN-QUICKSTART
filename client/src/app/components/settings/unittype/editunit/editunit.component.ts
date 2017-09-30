import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnittypesService } from '../../../../services/unittypes.service';
import { ToastrService } from 'ngx-toastr';

// TO use jQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'app-editunit',
  templateUrl: './editunit.component.html',
  styleUrls: ['./editunit.component.css']
})
export class EditunitComponent implements OnInit {
  unitType: any = {};
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private unittypesService: UnittypesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getUnitTypeDetails(this.route.snapshot.params['id']);
  }
  getUnitTypeDetails(id) {
    this.unittypesService.getUnitTypeDetails(this.route.snapshot.params['id']).then(

      res => {
        this.unitType = res;
      }, err => {
        console.log(err);
      });
    }

    save() {
      this.unittypesService.updateUnitType(this.unitType['_id'], this.unitType).then(
        res => {
          if ( !res['success'] ) {
            this.toastr.error(' Sorry, unable to edit a unit type right now, please try again soon', '', this.toastr_options);
          } else {
            this.toastr.success('Success !!!', '', this.toastr_options);
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
