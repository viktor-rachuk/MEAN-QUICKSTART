import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VillagesService {

  constructor( private http: Http ) { }
  getAllVils() {
    return new Promise((resolve, reject) => {
      this.http.get('/vils')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getVilDetails(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/vils/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveVil(village) {
    return new Promise((resolve, reject) => {
      this.http.post('/vils', { village })
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  updateVil(id, village) {
    return new Promise((resolve, reject) => {
      this.http.put('/vils/' + id, {village} )
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteVils(villages) {
    return new Promise((resolve, reject) => {
      this.http.post('/vils/delete', {villages})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deactivateVillages(vils) {
    return new Promise((resolve, reject) => {
      this.http.post('/vils/deactivate', vils)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  reactivateVillages(vils) {
    return new Promise((resolve, reject) => {
      this.http.post('/vils/reactivate', vils)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
