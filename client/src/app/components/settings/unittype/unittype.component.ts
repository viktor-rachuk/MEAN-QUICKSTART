import { Component, OnInit } from '@angular/core';
import { UnittypesService } from '../../../services/unittypes.service';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

// TO use jQuery and toastr jQuery Plugins
declare var $: any;
@Component({
  selector: 'app-unittype',
  templateUrl: './unittype.component.html',
  styleUrls: ['./unittype.component.css']
})
export class UnittypeComponent implements OnInit {
  unitTypes: any = [];
  selectedUnitTypes: any = [];
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
    private unitTypesService: UnittypesService,
    private toastr: ToastrService
  ) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.accounttype !== 'super') {
      window.history.back();
      this.toastr.error('You have no permission to access histories!', 'Permission Error', this.toastr_options);
    }
  }

  ngOnInit() {
    this.getAllUnitTypes();
  }

  getAllUnitTypes() {
    this.unitTypes = [];
    this.unitTypesService.getAllUnitTypes().then(
      res => {
        this.unitTypes = res;
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
            this.toastr.error(' Sorry, you did not selected any unit types', '', this.toastr_options );
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
