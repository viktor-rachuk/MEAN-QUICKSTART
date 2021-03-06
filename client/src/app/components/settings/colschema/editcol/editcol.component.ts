import { Component, OnInit } from '@angular/core';
import { UnittypesService } from '../../../../services/unittypes.service';
import { ColschemasService } from '../../../../services/colschemas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// To use jQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'app-editcol',
  templateUrl: './editcol.component.html',
  styleUrls: ['./editcol.component.css']
})
export class EditcolComponent implements OnInit {
  colSchema: any = {};
  unitTypes: any = [];
  unittypes_assigned: any = [];
  newArea: any = {};
  selectedAreas: any = [];
  selectedArea: any = {};
  areas: any = [];
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private unitTypesService: UnittypesService,
    private colSchemaService: ColschemasService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getColSchemaDetails(this.route.snapshot.params['id']);
  }

  getColSchemaDetails(id) {
    this.colSchemaService.getColDetails(id).then(
      res => {
        this.colSchema = res;
        this.areas = this.colSchema['area'];
        this.unittypes_assigned = res['unittypes_assigned'];
        this.unitTypesService.getAllUnitTypes().then(
          respond => {
            this.unitTypes = respond;
            for ( let i = 0; i < this.unitTypes.length; i++) {
              for ( let j = 0; j < this.unittypes_assigned.length; j++) {
                if ( this.unitTypes[i]._id === this.unittypes_assigned[j]) {
                  this.unitTypes[i]['checked'] = true;
                }
              }
            }
            }, error => {
            console.log(error);
          });
        }, err => {
        console.log(err);
      });
  }
  createArea() {
    this.areas.push(this.newArea);
    this.newArea = {};
  }

  selectArea(event) {
    if (event.target.checked) {
      this.selectedAreas.push(event.target.value);
    } else {
      for (let i = 0; i < this.selectedAreas.length; i++) {
        if (this.selectedAreas[i] === event.target.value) {
          this.selectedAreas.splice(i, 1);
        }
      }
    }
  }
  editArea(item) {
    this.selectedArea = item;
  }

  saveArea() {
    const index = this.areas.indexOf(this.selectedArea.name);
    this.areas[index] = this.selectedArea;
  }

  deleteAreas() {
    for (let i = 0; i < this.selectedAreas.length; i++) {
      for (let j = 0; j < this.areas.length; j++) {
        if (this.areas[j]['supplier'] === this.selectedAreas[i]) {
          const index = this.areas.indexOf(this.selectedAreas[i]);
          this.areas.splice(index, 1);
        }
      }
    }
    this.selectedAreas = [];
  }

  selectUnitType(event) {
    if (event.target.checked) {
      this.unittypes_assigned.push(event.target.value);
    } else {
      for (let i = 0; i < this.unittypes_assigned.length; i++) {
        if (this.unittypes_assigned[i] === event.target.value) {
          this.unittypes_assigned.splice(i, 1);
        }
      }
    }
  }

  save() {
    this.colSchema['unittypes_assigned'] = this.unittypes_assigned;
    this.colSchema['area'] = this.areas;
    this.colSchemaService.updateCol(this.colSchema['_id'], this.colSchema).then(
      res => {
        if (!res['success']) {
          this.toastr.error(' Sorry, unable to edit a colourschema right now, please try again soon', '', this.toastr_options);
        } else {
          this.toastr.success('Success !!!', '', this.toastr_options);
          this.router.navigate(['/col-schema']);
        }
        }, err => {
        console.log(err);
      });
  }

  cancel() {
    this.router.navigate(['/col-schema']);
  }

}
