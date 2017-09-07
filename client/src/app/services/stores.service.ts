import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';

@Injectable()
export class StoresService {
  constructor(private http: Http) { }
  getAllStores() {
    return new Promise((resolve, reject) => {
      this.http.get('/stores')
        .map(res => res.json())
        .retry(3)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveStore(store) {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem('id_token'));
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post('stores', store, {headers: headers})
        .map(res => res.json())
        .retry(3)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getStore(id) {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem('id_token'));
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
        this.http.get('stores/' + id,  {headers: headers})
          .map(res => res.json())
          .retry(3)
          .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  // Get Support Office Details
  getSupportOffice() {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem('id_token'));
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
        this.http.post('stores/support',  {headers: headers})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

// Update Store
  updateStore(id, data) {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem('id_token'));
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
        this.http.put('stores/' + id, data, {headers: headers})
          .map(res => res.json())
          .retry(3)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteStore(stores) {
    return new Promise((resolve, reject) => {
        this.http.post('stores/delete', stores)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deactivateStore(stores) {
    return new Promise((resolve, reject) => {
        this.http.post('stores/deactivate', stores)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  reactivateStore(stores) {
   return new Promise((resolve, reject) => {
        this.http.post('stores/reactivate', stores)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
}
