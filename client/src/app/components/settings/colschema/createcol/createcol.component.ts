import { Component, OnInit } from '@angular/core';
import { UnittypesService } from '../../../../services/unittypes.service';
import { ColschemasService } from '../../../../services/colschemas.service';
import { Router } from '@angular/router';
// TO use jQuery and toastr jQuery Plugins
declare var $: any;
declare var toastr: any;


@Component({
  selector: 'app-createcol',
  templateUrl: './createcol.component.html',
  styleUrls: ['./createcol.component.css']
})
export class CreatecolComponent implements OnInit {
  colSchema: any;
  unitTypes: any;
  areas: any;
  unittypes_assigned: any;
  newArea: any;
  selectedArea: any;
  selectedAreas: any;

  constructor(
    private router: Router,
    private unitTypesService: UnittypesService,
    private colSchemaService: ColschemasService
  ) { }

  ngOnInit() {
    this.areas = [];
    this.selectedArea = {};
    this.selectedAreas = [];
    this.newArea = {};
    this.unitTypes = [];
    this.unittypes_assigned = [];
    this.colSchema = {
      name: '',
      status: ''};
    this.getAllUnitTypes();
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
    this.selectedArea = {};
    this.selectedArea = item;
  }
  saveArea() {
    const index = this.areas.indexOf(this.selectedArea.name);
    this.areas[index] = this.selectedArea;
  }

  deleteAreas() {
    for ( let i = 0; i < this.selectedAreas.length; i++) {
      for (let j = 0; j < this.areas.length; j++) {
        if (this.areas[j]['supplier'] === this.selectedAreas[i]) {
          const index = this.areas.indexOf(this.selectedAreas[i]);
          this.areas.splice(index, 1);
        }
      }
    }
    this.selectedAreas = [];
  }

  getAllUnitTypes() {
    this.unitTypesService.getAllUnitTypes().then(
      res => {
        this.unitTypes = res;
        },
      err => {
        console.log(err);
      });
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
    this.colSchema.status = true;
    this.colSchema['area'] = this.areas;
    this.colSchema.unittypes_assigned = this.unittypes_assigned;
    this.colSchemaService.saveCol(this.colSchema).then(
      res => {
        if (!res['success']) {
          toastr.error(' Sorry, unable to create a colour schema right now, please try again soon');
        } else {
          toastr.success('Success !!!');
          this.router.navigate(['/col-schema']);
        }
        }, err => {
        console.log(err);
        alert('Something went wrong!!!');
      });
  }


  cancel() {
    this.router.navigate(['/col-schema']);
  }

}
