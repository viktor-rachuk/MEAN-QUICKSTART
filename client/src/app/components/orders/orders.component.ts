import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { StoresService } from '../../services/stores.service';
import { CompanyService } from '../../services/company.service';
import { SendremittanceService } from '../../services/sendremittance.service';
import { CurrentpermissionService } from '../../services/currentpermission.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import swal from 'sweetalert2';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  public loading = false;
  user: any;
  order_permission: any;
  send_remittance_permission: any;
  rows = [];
  temp = [];
  oinvoices: any = [];
  invoices: any = [];
  selectedOrders: any = [];
  stores: any = [];
  companies: any = [];
  codes = [];
  fType = 'All';
  fStore = 'All';
  fVillage = 'All';
  sVillage = 'All';
  sumAmount: any;
  sumBalance: any;
  invoiceCount = 0;
  tickCount = 0;
  selectedItem: any = {};
  summaries: any = [];
  oSummaries: any = [];
  summariesTotal: any = {};
  email_address = ''; // to send send remitance
  email_data = []; // invoices to send to support office (carpet court)
  toastr_options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    progressBar: true
  };
  constructor(
    private router: Router,
    private storeService: StoresService,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private sendRemittance: SendremittanceService,
    private permissionService: CurrentpermissionService
    ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.permissionService.getPermissions((permissions) => {
      this.order_permission = permissions.order;
      this.send_remittance_permission = permissions.send_remittance;
      if (permissions.user_type !== 'super') {
        if (!this.order_permission.create && !this.order_permission.edit && !this.order_permission.delete && !this.order_permission.view) {
          window.history.back();
          this.toastr.error('You have no permission to access orders!', 'Permission Error', this.toastr_options);
        }
      }
    });
    this.storeService.getSupportOffice().then(res => {
      this.email_address = res['email'];
    }, err => {
      console.log(err);
    });
  }

  async ngOnInit() {
    this.loading = true;
    await this.fetch(data => {
      const xml = $.parseXML(data).getElementsByTagName('row');
      // console.log(xml);
      for ( let i = 0; i < xml.length; i ++) {
        const InvNum = $(xml[i]).find('InvNum')[0].textContent;
        const InvDate = $(xml[i]).find('DateInvoiced')[0].textContent;
        const Store = $(xml[i]).find('StoreName')[0].textContent;
        const Village = $(xml[i]).find('Village')[0].textContent;
        const Balance = parseFloat($(xml[i]).find('Balance')[0].textContent);
        const AmountToPay = $(xml[i]).find('Balance')[0].textContent;
        const Period = $(xml[i]).find('Period')[0].textContent;
        const MonthsOld = $(xml[i]).find('MonthsOld')[0].textContent;
        const Value = $(xml[i]).find('Value')[0].textContent;
        const GST = $(xml[i]).find('GST')[0].textContent;
        const InvoiceTotal = parseFloat($(xml[i]).find('InvoiceTotal')[0].textContent);
        const PONum = $(xml[i]).find('PONum')[0].textContent;
        const Code = $(xml[i]).find('Code')[0].textContent;
        const CommonName = $(xml[i]).find('CommonName')[0].textContent;
        const invoice = {};
        invoice['invnum'] = InvNum;
        invoice['invdate'] = InvDate;
        invoice['store'] = Store;
        invoice['village'] = Village;
        if (Balance !== undefined) {
          invoice['balance'] = Balance;
        } else {
          invoice['balance'] = 0;
        }
        invoice['amounttopay'] = Balance;
        invoice['checked'] = false;
        invoice['period'] = Period;
        invoice['monthsold'] = MonthsOld;
        invoice['value'] = Value;
        invoice['gst'] = GST;
        invoice['invoicetotal'] = InvoiceTotal;
        invoice['ponum'] = PONum;
        invoice['code'] = Code;
        invoice['commonname'] = CommonName;

        let cExist = false;
        for ( let j = 0; j < this.codes.length; j++) {
          if (this.codes[j] === Code) {
            cExist = true;
          }
        }
        if (!cExist) {
          this.codes.push(Code);
        }
        this.invoices.push(invoice);
        this.oinvoices.push(invoice);
      }

      for (let i = 0; i < this.codes.length; i++) {
        const summary = {
          'older': 0,
          'three': 0,
          'two': 0,
          'one': 0,
          'current': 0
        };
        for ( let j = 0; j < this.invoices.length; j++) {
          if (this.codes[i] === this.invoices[j].code) {
            summary['village'] = this.invoices[j].village;
            const invoiceTotal = this.invoices[j].invoicetotal;
            if (this.invoices[j].period === 'Current') {
             if ( summary['current'] === 0) {
               summary['current'] = invoiceTotal;
             } else {
               summary['current'] += invoiceTotal;
             }
            } else {
              if (parseFloat(this.invoices[j].monthsold) > 3) {
                if ( summary['older'] === 0) {
                   summary['older'] = invoiceTotal;
                 } else {
                   summary['older'] += invoiceTotal;
                 }
              } else if (parseFloat(this.invoices[j].monthsold) === 3) {
                if ( summary['three'] === 0) {
                   summary['three'] = invoiceTotal;
                 } else {
                   summary['three'] += invoiceTotal;
                 }
              } else if (parseFloat(this.invoices[j].monthsold) === 2) {
                if ( summary['two'] === 0) {
                   summary['two'] = invoiceTotal;
                 } else {
                   summary['two'] += invoiceTotal;
                 }
              } else {
                if ( summary['one'] === 0) {
                   summary['one'] = invoiceTotal;
                 } else {
                   summary['one'] += invoiceTotal;
                 }
              }
            }
          }
        }
        summary['code'] = this.codes[i];
        this.summaries.push(summary);
        this.oSummaries.push(summary);
      }
      this.getAllCompanies();
    });
  }

  getAllStores() {
    this.storeService.getAllStores().then(res => {
      this.loading = false;
      let ids = [];
      for (let i = 0; i < this.companies.length; i ++) {
        for (let j = 0; j < this.companies[i]['assigned_stores'].length; j++) {
          ids.push(this.companies[i]['assigned_stores'][j]);
        }
      }
      ids = Array.from(new Set(ids));
      for (let i = 0; i < Object.keys(res).length; i++) {
        for (let j = 0 ; j < ids.length; j ++) {
          if (res[i]._id === ids[j]) {
            this.stores.push(res[i]);
          }
        }
      }
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }

  filterInvoices () {
    if (this.user.accounttype === 'super' || this.user.accounttype === 'staff') {
      for (let i = 0; i < this.invoices.length; i ++) {
        this.invoices[i]['visible'] = true;
        this.invoiceCount++;
      }
    } else {
      for (let i = 0; i < this.invoices.length; i ++) {
        for (let j = 0; j < this.companies.length; j ++) {
          if (this.invoices[i]['village'] === this.companies[j].name) {
            this.invoices[i]['visible'] = true;
            this.invoiceCount++;
          }
        }
      }
    }
  }

  filterSummary() {
    if (this.user.accounttype === 'super' || this.user.accounttype === 'staff') {
      for (let i = 0; i < this.oSummaries.length; i ++) {
        this.oSummaries[i]['visible'] = true;
      }
    } else {
      for (let i = 0; i < this.oSummaries.length; i ++) {
        for (let j = 0; j < this.companies.length; j ++) {
          if (this.oSummaries[i]['village'] === this.companies[j].name) {
            this.oSummaries[i]['visible'] = true;
          }
        }
      }
    }
  }

  getTotalSummary() {
    let olderTotal = 0, threeTotal = 0, twoTotal = 0, oneTotal = 0, currentTotal = 0;
    for ( let i = 0; i < this.summaries.length; i++) {
      if (this.summaries[i]['visible'] === true) {
        if (this.summaries[i].older) {
          olderTotal += parseFloat(this.summaries[i].older);
        }

        if (this.summaries[i].three) {
          threeTotal += parseFloat(this.summaries[i].three);
        }
        if (this.summaries[i].two) {
          twoTotal += parseFloat(this.summaries[i].two);
        }
        if (this.summaries[i].one) {
          oneTotal += parseFloat(this.summaries[i].one);
        }
        if (this.summaries[i].current) {
          currentTotal += parseFloat(this.summaries[i].current);
        }
      }
    }

    this.summariesTotal['older'] = olderTotal;
    this.summariesTotal['three'] = threeTotal;
    this.summariesTotal['two'] = twoTotal;
    this.summariesTotal['one'] = oneTotal;
    this.summariesTotal['current'] = currentTotal;
    this.summariesTotal['sumtotal'] = olderTotal + threeTotal + twoTotal + oneTotal + currentTotal;
  }
  // Get All Companies
  getAllCompanies() {
    this.companyService.getAllCompanies().then(res => {
      if (this.user.accounttype === 'super' || this.user.accounttype === 'staff') {
        this.companies = res;
        this.getAllStores();
        this.filterInvoices();
        this.filterSummary();
        this.getTotalSummary();
      }
      if (this.user.accounttype === 'customer') {
        this.companyService.getAllChilds(this.user.companies_assigned).then(response => {
          const ids = this.user.companies_assigned.concat(response);
          for (let i = 0; i < Object.keys(res).length; i ++) {
            for (let j = 0; j < ids.length; j ++) {
              if (res[i]._id === ids[j] && res[i]['is_debtor'] === true) {
                this.companies.push(res[i]);
              }
            }
          }
          this.getAllStores();
          this.filterInvoices();
          this.filterSummary();
          this.getTotalSummary();
        }, error => {
          console.log(error);
        });
      }
    }, err => {
      console.log(err);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', '/data/Summerset_Invoices.xml', true);
    req.onload = () => {
      cb(req.response);
    };
    req.send();
  }

  updateFilter(event) {
    const val = event.target.value;
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
  }

  filter() {
    this.invoices = [];
    this.invoiceCount = 0;
    for ( let i = 0; i < this.oinvoices.length; i++) {
      const invoice = this.oinvoices[i];
      if (this.fVillage !== 'All' && this.fVillage !== invoice.village) continue;
      if (this.fStore !== 'All' && this.fStore !== invoice.store) continue;
      if (this.fType !== 'All' && this.fType !== 'Order') continue;
      this.invoices.push(invoice);
      this.invoiceCount++;
    }
    if (this.fVillage === 'All') {
      this.invoiceCount = 0;
      for (let i = 0; i < this.invoices.length; i ++) {
        if (this.invoices[i]['visible'] === true) {
          this.invoiceCount++;
        }
      }
    }
    this.calculateSum();
  }

  filterSummaries() {
    this.oSummaries = [];
    for ( let i = 0; i < this.summaries.length; i++ ) {
      if (this.sVillage !== 'All' && this.summaries[i].village !== this.sVillage) continue;
      this.oSummaries.push(this.summaries[i]);
    }
  }
  createOrder() {
    this.router.navigate(['/orders/create']);
  }

  calculateSum() {
    this.sumAmount = 0;
    this.sumBalance = 0;
    for (let i = 0; i < this.invoices.length; i++) {
      const invoice = this.invoices[i];
      if (invoice.checked) {
        if (isNaN(parseFloat(invoice.amounttopay))) {
          this.sumAmount += 0;
        } else {
          this.sumAmount += parseFloat(invoice.amounttopay);
        }
        this.sumBalance += parseFloat(invoice.balance);
      }
    }
  }

  selectElement(event, item) {
    if (event.target.checked) {
      this.tickCount++;
      this.email_data.push(item);
    } else {
      this.tickCount--;
      for (let i = 0; i < this.email_data.length; i ++) {
        if (this.email_data[i].invnum === event.target.value) {
          this.email_data.splice(i, 1);
        }
      }
    }
    for (let i = 0; i < this.invoices.length; i++ ) {
      if (this.invoices[i].invnum === event.target.value) {
        this.invoices[i].checked = event.target.checked;
      }
    }

    this.calculateSum();
  }

  showDetails(item) {
    this.selectedItem = {};
    this.selectedItem = item;
  }

  sendEmail() {
    if (this.email_data.length !== 0) {
      swal({
        title: 'Send remittance advice?',
        html: 'A notification will be sent to ' + '<br>' + this.user.email + '<br>' + this.email_address,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, please!',
        cancelButtonText: 'No, not yet'
      }).then(() => {
        swal(
          {
            title: 'Remittance sent successfully!',
            html: 'Notification of this advice were sent to' + '<br>'
            + this.user.email + '<br>' + this.email_address
          }
        );
        const content = {};
        content['data'] = this.email_data;
        content['user'] = this.user.username;
        console.log(this.user);
        content['accounttype'] = this.user.accounttype;
        content['totalamount'] = 0;
        createdAt((current_time) => {
          content['created_at'] = current_time;
        });
        content['totalbal'] = 0;
        for (let i = 0; i < this.email_data.length; i ++) {
          content['totalamount'] += parseFloat(this.email_data[i].amounttopay);
          content['totalbal'] += parseFloat(this.email_data[i].balance);
        }
        content['support_email'] = this.email_address;
        content['sender_email'] = this.user.email;
        this.sendRemittance.sendRemittance(content).then(res => {
          if (res['success']) {
            this.toastr.info('Sent remittance email!', '', this.toastr_options);
          } else {
            this.toastr.error('Failed to send  remittance email!', '', this.toastr_options);
          }
        }, err => {
          this.toastr.error('Failed to send  remittance email!', '', this.toastr_options);
        });
      }, (dismiss) => {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
          swal(
            'Cancelled',
            'Cancelled Remittance advice has not been sent. :)',
            'error'
            );
        }
      });
    } else {
      this.toastr.error('You did not selected any order or invoice!', '', this.toastr_options);
    }
  }
}

  function createdAt(callback) {
    const today = new Date();
    const date = today.getDate() + '/' + (today.getMonth() + 1 ) + '/' + today.getFullYear();
    const time = today.toLocaleString('en-NZ', { hour: 'numeric', minute : 'numeric', hour12: true });
    const created_at = time + '  ' + date;
    return callback(created_at);
  }