import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UnittypesService {

  constructor( private http: Http ) { }
  getAllUnitTypes() {
    return new Promise((resolve, reject) => {
      this.http.get('/unittypes')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUnitTypeDetails(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/unittypes/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveUnitType(unittype) {

    return new Promise((resolve, reject) => {
      this.http.post('/unittypes', {unittype})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  updateUnitType(id, unittype) {
    return new Promise((resolve, reject) => {
      this.http.put('/unittypes/' + id, {unittype} )
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteUnitTypes(unittypes) {
    return new Promise((resolve, reject) => {
      this.http.post('/unittypes/delete', { unittypes })
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deactivateUnitTypes(unittypes) {
    return new Promise((resolve, reject) => {
      this.http.post('/unittypes/deactivate', {unittypes})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  reactivateUnitTypes(unittypes) {
    return new Promise((resolve, reject) => {
      this.http.post('/unittypes/reactivate', {unittypes})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
