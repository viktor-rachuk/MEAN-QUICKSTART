import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {
  authToken: any;
  constructor(private http: Http) { }
  getAllCompanies() {
    return new Promise((resolve, reject) => {
      this.http.get('/companies')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getCompanyStructure(id) { // for company structure in company create and edit screen
    return new Promise((resolve, reject) => {
      this.http.post('/companies/structure', {id})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getChildTree(ids) { // for companies screen when customer user logged in, ids is assigned companies to customer user
    return new Promise((resolve, reject) => {
      this.http.post('/companies/some', {ids})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getCompaniesTree() {
    return new Promise((resolve, reject) => {
      this.http.get('/companies/all')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getCompanyDetail(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/companies/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  createCompany(company) {
    return new Promise((resolve, reject) => {
      this.http.post('/companies', {company})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateCompany(id, company) {
    return new Promise((resolve, reject) => {
      this.http.put('/companies/' + id, {company})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteCompanies(companies) {
    return new Promise((resolve, reject) => {
      this.http.post('/companies/delete', companies)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deactivateRoles(companies) {
    return new Promise((resolve, reject) => {
      this.http.post('/companies/deactivate', companies)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllChilds(ids) {
    return new Promise((resolve, reject) => {
      this.http.post('/companies/childs', ids)
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getCompaniesWithIds(ids) {
    return new Promise((resolve, reject) => {
      this.http.post('/companies/ids', ids)
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  reactivateRoles(companies) {
    return new Promise((resolve, reject) => {
      this.http.post('/companies/reactivate', companies)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
