import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { UsersService } from '../../services/users.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
declare var swal: any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  public loading = false;
  currentCompanies: any;
  selectedCompanies: any;
  items: TreeviewItem[];
  user: any;
  company_permission: any;
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    maxHeight: 400
  });

  constructor(private companyServices: CompanyService, private userService: UsersService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.special_permissions) {
      this.company_permission = this.user.special_permissions['company'];
    }
    if (this.user.role) {
      this.company_permission = this.user.role['company'];
    }
  }

  ngOnInit() {
    this.selectedCompanies = [];
    this.getAllCompanies();
    // this.items = [this.itCategory];
  }

  getAllCompanies() {
    this.loading = true;
    if (this.user.accounttype === 'super' || this.user.accounttype === 'staff') {
      this.companyServices.getCompaniesTree().then(
        res => {
          this.loading = false;
          this.currentCompanies = res;
          const items = [];
          for (let i = 0; i < Object.keys(res).length; i ++) {
            const item = new TreeviewItem(res[i]);
            items.push(item);
          }
          this.items = this.sortByKey(items, 'name');
        },
        err => {
          console.log(err);
          this.loading = false;
        }
        );
    }
    if (this.user.accounttype === 'customer') {
      this.userService.getUserDetails(this.user.id).then(res => {
        this.companyServices.getChildTree(res['user'].companies_assigned).then(
          respond => {
            this.loading = false;
            this.currentCompanies = respond;
            const items = [];
            for (let i = 0; i < Object.keys(respond).length; i ++) {
              const item = new TreeviewItem(respond[i]);
              items.push(item);
            }
            this.items = this.sortByKey(items, 'name');
          },
          error => {
            this.loading = false;
            console.log(error);
          }
          );
      }, err => {
        this.loading = false;
        console.log(err);
      });
    }
  }
  deleteComapnies() {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover selected companies!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(() => {
      this.companyServices.deleteCompanies(this.selectedCompanies).then(
        (res) => {
          this.selectedCompanies = [];
          this.getAllCompanies();
        },
        (err) => {
          console.error(err);
        });
      swal(
        'Deleted!',
        'Selected companies has been deleted.',
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
  }

  deactivateComapnies() {
    this.companyServices.deactivateRoles(this.selectedCompanies).then(
      res => {
        this.getAllCompanies();
      },
      err => {
        console.error(err);
      }
      );
  }

  reactivateComapnies() {
    this.companyServices.reactivateRoles(this.selectedCompanies).then(
      res => {
        this.getAllCompanies();
      },
      err => {
        console.error(err);
      }
      );
  }
  onSelectedChange($event) {
    console.log($event);
  }

  selectItem(event) {
    if (event.target.checked) {
      this.selectedCompanies.push(event.target.value);
      console.log(this.selectedCompanies);
    } else {
      for (let i = 0; i < this.selectedCompanies.length; i ++) {
        if (this.selectedCompanies[i] === event.target.value) {
          this.selectedCompanies.splice(i, 1);
        }
      }
      console.log(this.selectedCompanies);
    }
  }

  // sort users ASC
  sortByKey(array, key) {
    return array.sort((a, b) => {
      const x = a[key].toUpperCase();
      const y = b[key].toUpperCase();
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
}
