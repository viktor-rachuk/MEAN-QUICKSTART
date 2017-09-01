import { Component, OnInit } from '@angular/core';
import { UnittypesService } from '../../../services/unittypes.service';
import { VillagesService } from '../../../services/villages.service';
declare var swal: any;
// TO use jQuery and toastr jQuery Plugins
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-unittype',
  templateUrl: './unittype.component.html',
  styleUrls: ['./unittype.component.css']
})
export class UnittypeComponent implements OnInit {
  unitTypes: any;
  selectedUnitTypes: any;
  villages: any;

  constructor(
    private unitTypesService: UnittypesService,
    private villagesService: VillagesService
  ) { }

  ngOnInit() {
    this.unitTypes = [];
    this.selectedUnitTypes = [];
    this.villages = [];
    this.getAllUnitTypes();
  }

  getAllUnitTypes() {
    this.unitTypes = [];
    this.unitTypesService.getAllUnitTypes().then(
      res => {
        let temp = [];
        this.villagesService.getAllVils().then(
          respond => {
            for (let i = 0; i < Object.keys(res).length; i++) {
              let unitType = {}
              unitType['_id'] = res[i]._id;
              unitType['name'] = res[i].name;
              unitType['status'] = res[i].status;
              temp = [];
              for ( let j = 0; j < Object.keys(respond).length; j++ ) {
                for (let k = 0; k < res[i]['villages_assigned'].length; k++ ) {
                  if ( respond[j]._id === res[i]['villages_assigned'][k] ) {
                    temp.push(respond[j].name);
                  }
                }
              }
              unitType['villages_assigned'] = temp;
              this.unitTypes.push(unitType);
            }
          },
          error => {
            console.log(error);
          });
        }, err => { console.log(err); });
      }

      deleteUnitTypes() {
        if (this.selectedUnitTypes.length !== 0) {
          swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover selected unittypes!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then(() => {
            this.unitTypesService.deleteUnitTypes(this.selectedUnitTypes).then(
              res => {
                if (res['success']) {
                  this.selectedUnitTypes = [];
                  this.getAllUnitTypes();
                }
              },
              err => {
                console.error(err);
              });
              swal(
                'Deleted!',
                'Selected UnitTypes has been deleted.',
                'success'
              );
            }, (dismiss) => {
              // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
              if (dismiss === 'cancel') {
                swal(
                  'Cancelled',
                  'Your imaginary file is safe :)',
                  'error'
                );
              }
            });
          } else {
            toastr.error(' Sorry, you did not selected any unit types' );
          }
        }

        deactivateUnitTypes() {
          this.unitTypesService.deactivateUnitTypes(this.selectedUnitTypes).then(
            res => {
              this.getAllUnitTypes();
              this.selectedUnitTypes = [];
            }, err => {
              console.log(err);
            });
          }

          reactivateUnitTypes() {
            this.unitTypesService.reactivateUnitTypes(this.selectedUnitTypes).then (
              res => {
                this.getAllUnitTypes();
                this.selectedUnitTypes = [];
              }, err => {
                console.log(err);
              });

            }

            selectElement(event) {
              if (event.target.checked) {
                this.selectedUnitTypes.push(event.target.value);
              } else {
                for (let i = 0; i < this.selectedUnitTypes.length; i++) {
                  if (this.selectedUnitTypes[i] === event.target.value) {
                    this.selectedUnitTypes.splice(i, 1);
                  }
                }
              }
            }
          }
