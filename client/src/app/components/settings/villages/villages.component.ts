import { Component, OnInit } from '@angular/core';
import { VillagesService } from '../../../services/villages.service';
declare var swal: any;

@Component({
  selector: 'app-villages',
  templateUrl: './villages.component.html',
  styleUrls: ['./villages.component.css']
})
export class VillagesComponent implements OnInit {
  villages: any;
  selectedVillages: any;

  constructor(private villlageService : VillagesService) { }
  ngOnInit() {
    this.villages = [];
    this.selectedVillages = [];

    this.getAllVillages();
  }

  getAllVillages() {
    this.villlageService.getAllVils().then((res) => {
      this.villages = res;
    }, (err) => {
      console.log(err);
    });
  }

  deleteVils() {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover selected villages!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(() => {
      this.villlageService.deleteVils(this.selectedVillages).then(
        res => {
          if (res['success']) {
            this.selectedVillages = [];
            this.getAllVillages();
          }
        },
        err => {
          console.error(err);
        });
        swal(
          'Deleted!',
          'Selected Villages has been deleted.',
          'success'
        )
      }, (dismiss) => {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
          swal(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )}
        });
      }

      deactivateVils() {
        this.villlageService.deactivateVillages(this.selectedVillages).then(

          res => {
            this.getAllVillages();
            this.selectedVillages = [];
          },
          err => {
            console.error(err);
          }
        );

      }

      reactivateVils() {
        this.villlageService.reactivateVillages(this.selectedVillages).then(

          res => {
            this.getAllVillages();
            this.selectedVillages = [];
          },
          err => {
            console.error(err);
          }
        );

      }

      selectElement(event) {
        if (event.target.checked) {
          this.selectedVillages.push(event.target.value);
        } else {
          for (let i = 0; i < this.selectedVillages.length; i++) {
            if (this.selectedVillages[i] === event.target.value) {
              this.selectedVillages.splice(i, 1);
            }
          }
        }
      }
    }
