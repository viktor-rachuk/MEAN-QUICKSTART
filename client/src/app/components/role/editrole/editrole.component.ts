import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { VillagesService } from '../../../services/villages.service';
// TO use jQuery and toastr jQuery Plugins
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-editrole',
  templateUrl: './editrole.component.html',
  styleUrls: ['./editrole.component.css'],
})
export class EditroleComponent implements OnInit {
  currentRole: any = {};
  staff: any = {};
  customer: any = {};
  store: any = {};
  order: any = {};
  role: any = {};
  status: any;
  company: any = {};
  display_dashboard: any;
  villages: any;
  villages_assigned: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private villagesService: VillagesService
  ) {}

  ngOnInit() {
    this.villages = [];
    this.villages_assigned = [];
    this.getRoleDetails(this.route.snapshot.params['id']);
    // Init UI elements
    toastr.options = {
      'debug': false,
      'newestOnTop': false,
      'positionClass': 'toast-bottom-right',
      'closeButton': true,
      'progressBar': true
    };
  }

  getRoleDetails(id) {
    this.roleService.getRoleDetails(id).then(
      res => {
        this.currentRole = res;
        this.staff = res['staff'];
        this.customer = res['customer'];
        this.store = res['store'];
        this.order = res['order'];
        this.role = res['role'];
        this.company = res['company'];
        this.status = res['status'];
        this.display_dashboard = res['display_dashboard'];
        this.villages_assigned = res['villages_assigned'];
        this.villagesService.getAllVils().then(
          respond => {
            this.villages = respond;
            for ( let i = 0; i < this.villages.length; i++ ) {
              for ( let j = 0; j < this.villages_assigned.length; j++ ) {
                if (this.villages[i]._id === this.villages_assigned[j] ) {
                 this.villages[i]['checked'] = true;
                }
              }
            }
          },

          error => {
            console.log(error);
          }
        );

      },
      err => {
        console.log(err);
      }
    );
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
  checkAllVillages(event) {
    if (event.target.checked) {
      for (let i = 0; i < this.villages.length; i++) {
        this.villages[i]['checked'] = true;
      }
    } else {
      for (let i = 0; i < this.villages.length; i++) {
        this.villages[i]['checked'] = false;
      }
    }
  }

    // select All permission, deselect all
    selectAll(event) {
      if (event.target.value === 'create') {
        if (event.target.checked) {
          this.staff['create'] = true;
          this.customer['create'] = true;
          this.company['create'] = true;
          this.role['create'] = true;
          this.store['create'] = true;
          this.order['create'] = true;
        } else {
          this.staff['create'] = false;
          this.customer['create'] = false;
          this.company['create'] = false;
          this.role['create'] = false;
          this.store['create'] = false;
          this.order['create'] = false;
        }
      } else if (event.target.value === 'edit') {
        if (event.target.checked) {
          this.staff['edit'] = true;
          this.customer['edit'] = true;
          this.company['edit'] = true;
          this.role['edit'] = true;
          this.store['edit'] = true;
          this.order['edit'] = true;
        } else {
          this.staff['edit'] = false;
          this.customer['edit'] = false;
          this.company['edit'] = false;
          this.role['edit'] = false;
          this.store['edit'] = false;
          this.order['edit'] = false;
        }
      } else if(event.target.value === 'delete') {
        if (event.target.checked) {
          this.staff['delete'] = true;
          this.customer['delete'] = true;
          this.company['delete'] = true;
          this.role['delete'] = true;
          this.store['delete'] = true;
          this.order['delete'] = true;
        } else {
          this.staff['delete'] = false;
          this.customer['delete'] = false;
          this.company['delete'] = false;
          this.role['delete'] = false;
          this.store['delete'] = false;
          this.order['delete'] = false;
        }
      } else if (event.target.value === 'view') {
        if (event.target.checked) {
          this.staff['view'] = true;
          this.customer['view'] = true;
          this.company['view'] = true;
          this.role['view'] = true;
          this.store['view'] = true;
          this.order['view'] = true;
        } else {
          this.staff['view'] = false;
          this.customer['view'] = false;
          this.company['view'] = false;
          this.role['view'] = false;
          this.store['view'] = false;
          this.order['view'] = false;
        }
      }
  }

  save() {
    this.currentRole.staff = this.staff;
    this.currentRole.customer = this.customer;
    this.currentRole.order = this.order;
    this.currentRole.store = this.store;
    this.currentRole.role = this.role;
    this.currentRole.status = this.status;
    this.currentRole.display_dashboard = this.display_dashboard;
    this.roleService.updateRole(this.currentRole._id, this.currentRole).then(
      res => {
        if (!res['success']) {
          toastr.error(' Sorry, unable to edit a user role right now, please try again soon');
        } else {
          toastr.success('Success !!!');
          this.router.navigate(['/roles']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  cancel() {
    this.router.navigate(['/roles']);
  }
}
