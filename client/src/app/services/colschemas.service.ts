import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ColschemasService {

  constructor( private http: Http ) { }
  getAllCols() {
    return new Promise((resolve, reject) => {
      this.http.get('/cols')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getColDetails(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/cols/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveCol(col) {
    return new Promise((resolve, reject) => {
      this.http.post('/cols', {col})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  updateCol( id, col ) {
    return new Promise((resolve, reject) => {
      this.http.put('/cols/' + id, {col} )
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteCols( cols ) {
    return new Promise((resolve, reject) => {
      this.http.post('/cols/delete', {cols})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  deactivateColSchemas(cols) {
    return new Promise((resolve, reject) => {
      this.http.post('/cols/deactivate', {cols})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  reactivateColSchemas(cols) {
    return new Promise((resolve, reject) => {
      this.http.post('/cols/reactivate', {cols})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

    getAllAreas() {
    return new Promise((resolve, reject) => {
      this.http.get('/areas/')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAreaDetails(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/areas/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveArea( area ) {
    return new Promise((resolve, reject) => {
      this.http.post('/areas', area)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  updateArea( id, area ) {
    return new Promise((resolve, reject) => {
      this.http.put('/areas/' + id, area )
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteAreas( areas ) {
    return new Promise((resolve, reject) => {
      this.http.post('/areas/delete', areas)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
