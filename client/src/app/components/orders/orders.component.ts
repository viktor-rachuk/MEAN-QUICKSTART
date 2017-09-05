import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { StoresService } from '../../services/stores.service';
import { CompanyService } from '../../services/company.service';
import { SendremittanceService } from '../../services/sendremittance.service';


declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  location: Location;
  user: any;
  order_permission: any;
  rows = [];
  temp = [];
  oinvoices = [];
  invoices = [];
  selectedOrders = [];
  stores = [];
  companies = [];
  codes = [];
  fType = 'All';
  fStore = 'All';
  fVillage = 'All';
  sVillage = 'All';
  sumAmount = 0;
  sumBalance = 0;
  invoiceCount = 0;
  tickCount = 0;
  selectedItem = {};
  summaries = [];
  oSummaries = [];
  summariesTotal = {};
  email_address = ''; // to send send remitance
  email_data = []; // invoices to send to support office (carpet court)
  constructor(
    private router: Router,
    private storeService: StoresService,
    private companyService: CompanyService,
    private sendRemittance: SendremittanceService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.special_permissions) {
      this.order_permission = this.user.special_permissions['order'];
    }
    if (this.user.role) {
      this.order_permission = this.user.role['order'];
    }
    this.storeService.getSupportOffice().then(res => {
      this.email_address = res['email'];
    }, err => {
      console.log(err);
    });
    this.fetch(data => {
      const xml = $.parseXML(data).getElementsByTagName('row');
      // console.log(xml);
      for ( let i = 0; i < xml.length; i ++) {
        const InvNum = $(xml[i]).find('InvNum')[0].textContent;
        const InvDate = $(xml[i]).find('DateInvoiced')[0].textContent;
        const Store = $(xml[i]).find('StoreName')[0].textContent;
        const Village = $(xml[i]).find('Village')[0].textContent;
        const Balance = $(xml[i]).find('Balance')[0].textContent;
        const AmountToPay = $(xml[i]).find('Balance')[0].textContent;
        const Period = $(xml[i]).find('Period')[0].textContent;
        const MonthsOld = $(xml[i]).find('MonthsOld')[0].textContent;
        const Value = $(xml[i]).find('Value')[0].textContent;
        const GST = $(xml[i]).find('GST')[0].textContent;
        const InvoiceTotal = $(xml[i]).find('InvoiceTotal')[0].textContent;
        const PONum = $(xml[i]).find('PONum')[0].textContent;
        const Code = $(xml[i]).find('Code')[0].textContent;
        const CommonName = $(xml[i]).find('CommonName')[0].textContent;
        const invoice = {};
        invoice['invnum'] = InvNum;
        invoice['invdate'] = InvDate;
        invoice['store'] = Store;
        invoice['village'] = Village;
        invoice['balance'] = Balance;
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
        const summary = {};
        for ( let j = 0; j < this.invoices.length; j++) {
          if (this.codes[i] === this.invoices[j].code) {
            summary['village'] = this.invoices[j].village;
            if (this.invoices[j].period === 'Current') {
              summary['current'] = parseFloat(this.invoices[j].invoicetotal);
            } else {
              if (parseFloat(this.invoices[j].monthsold) > 3) {
                summary['older'] = parseFloat(this.invoices[j].invoicetotal);
              } else if (parseFloat(this.invoices[j].monthsold) === 3) {
                summary['three'] = parseFloat(this.invoices[j].invoicetotal);
              } else if (parseFloat(this.invoices[j].monthsold) === 2) {
                summary['two'] = parseFloat(this.invoices[j].invoicetotal);
              } else {
                summary['one'] = parseFloat(this.invoices[j].invoicetotal);
              }
            }
          }
        }
        summary['code'] = this.codes[i];
        this.summaries.push(summary);
        this.oSummaries.push(summary);
      }
    });
  }

  ngOnInit() {
    this.getAllCompanies();
  }

  getAllStores() {
    this.storeService.getAllStores().then(res => {
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
          olderTotal += this.summaries[i].older;
        }

        if (this.summaries[i].three) {
          threeTotal += this.summaries[i].three;
        }
        if (this.summaries[i].two) {
          twoTotal += this.summaries[i].two;
        }
        if (this.summaries[i].one) {
          oneTotal += this.summaries[i].one;
        }
        if (this.summaries[i].current) {
          currentTotal += this.summaries[i].current;
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
        for (let i = 0; i < Object.keys(res).length; i ++) {
          this.companies.push(res[i]);
        }
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
    req.open('GET', 'assets/data/Summerset_Invoices.xml');
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
        if (isNaN(parseInt(invoice.amounttopay))) {
          this.sumAmount += 0;
        } else {
          this.sumAmount += parseInt(invoice.amounttopay);
        }
        this.sumBalance += parseInt(invoice.balance);
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
    console.log(this.email_data);
  }

  showDetails(item) {
    this.selectedItem = {};
    this.selectedItem = item;
  }

  sendEmail() {
    swal({
      title: 'Are you sure?',
      text: 'You will Send Email to Carpet Court!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, please!',
      cancelButtonText: 'No, keep it'
    }).then(() => {
      const content = {};
      content['sumAmount'] = this.sumAmount;
      content['sumBalance'] = this.sumBalance;
      content['type'] = 'remitance';
      content['email'] = this.email_address;
      this.sendRemittance.sendRemittance(content).then(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
      swal(
        'Sent Email Succesffully!',
        'Sent Email To Carpet Court.',
        'success'
      );
    }, function(dismiss) {
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
}
