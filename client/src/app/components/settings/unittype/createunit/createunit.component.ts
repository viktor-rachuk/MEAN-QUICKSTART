import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnittypesService } from '../../../../services/unittypes.service';
import { ToastrService } from 'ngx-toastr';

// TO use jQuery and toastr jQuery Plugins
declare var $: any;

@Component({
  selector: 'app-createunit',
  templateUrl: './createunit.component.html',
  styleUrls: ['./createunit.component.css']
})
export class CreateunitComponent implements OnInit {

  newUnitType: any;
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
    private router: Router,
    private unittypesService: UnittypesService,
    private toastr: ToastrService
  ) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.accounttype !== 'super') {
      window.history.back();
      this.toastr.error('You have no permission to access histories!', 'Permission Error', this.toastr_options);
    }
  }

  ngOnInit() {
    this.newUnitType = {
      name: '',
      status: ''
    };
  }
  save() {
    this.newUnitType.status = true;
    this.unittypesService.saveUnitType(this.newUnitType).then(
      res => {
         if (!res['success']) {
          this.toastr.error(' Sorry, unable to create a unittype right now, please try again soon', '', this.toastr_options);
        } else {
          this.toastr.success('Success !!!', '', this.toastr_options);
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
