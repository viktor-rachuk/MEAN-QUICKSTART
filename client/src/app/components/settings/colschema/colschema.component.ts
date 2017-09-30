import { Component, OnInit } from '@angular/core';
import { UnittypesService } from '../../../services/unittypes.service';
import { ColschemasService } from '../../../services/colschemas.service';
import { ToastrService } from 'ngx-toastr';

import swal from 'sweetalert2';

// To use jQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'app-colschema',
  templateUrl: './colschema.component.html',
  styleUrls: ['./colschema.component.css']
})
export class ColschemaComponent implements OnInit {
  unitTypes: any;
  colSchemas: any;
  unitTypesAssigned: any;
  selectedColSchemas = [];
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
    private unitTypesService: UnittypesService,
    private colSchemaService: ColschemasService,
    private toastr: ToastrService
  ) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.accounttype !== 'super') {
      window.history.back();
      this.toastr.error('You have no permission to access colour schemas!', 'Permission Error', this.toastr_options);
    }
  }

  ngOnInit() {
    this.unitTypes = [];
    this.colSchemas = [];
    this.unitTypesAssigned = [];
    this.getAllColSchemas();
  }

  getAllColSchemas() {
    this.colSchemas = [];
    this.colSchemaService.getAllCols().then(

      res => {
        let temp = [];
        this.unitTypesService.getAllUnitTypes().then(

          respond => {
            for (let i = 0; i < Object.keys(res).length; i++) {
              const colSchema = {};
              colSchema['_id'] = res[i]._id;
              colSchema['name'] = res[i].name;
              colSchema['status'] = res[i].status;
              temp = [];
              for ( let j = 0; j < Object.keys(respond).length; j++ ) {
                for (let k = 0; k < res[i]['unittypes_assigned'].length; k++ ) {
                  if ( respond[j]._id === res[i]['unittypes_assigned'][k] ) {
                    temp.push(respond[j].name);
                  }
                }
              }
              colSchema['unittypes_assigned'] = temp;
              this.colSchemas.push(colSchema);
            }
          }, error => {
            console.log(error);
          });
        },
        err => {
          console.log(err);
        });
      }

      deleteColSchemas() {
        if (this.selectedColSchemas.length !== 0) {
          swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover selected colour schemas!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then(() => {
            this.colSchemaService.deleteCols(this.selectedColSchemas).then(
              res => {
                if (res['success']) {
                  this.selectedColSchemas = [];
                  this.getAllColSchemas();
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
        deactivateColSchemas() {
          this.colSchemaService.deactivateColSchemas(this.selectedColSchemas).then(

            res => {
              this.getAllColSchemas();
              this.selectedColSchemas = [];
            },
            err => {
              console.log(err);
            }
          );
        }
        reactivateColSchemas() {
          this.colSchemaService.reactivateColSchemas(this.selectedColSchemas).then (

            res => {
              this.getAllColSchemas();
              this.selectedColSchemas = [];
            },
            err => {
              console.log(err);
            }
          );
        }

        selectElement(event) {
          if (event.target.checked) {
            this.selectedColSchemas.push(event.target.value);
          } else {
            for (let i = 0; i < this.selectedColSchemas.length; i++) {
              if (this.selectedColSchemas[i] === event.target.value) {
                this.selectedColSchemas.splice(i, 1);
              }
            }
          }
        }
      }
