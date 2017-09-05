import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RoleService {
  authToken: any;
  constructor(private http: Http) { }
   getAllRoles() {
    return new Promise((resolve, reject) => {
      this.http.get('/roles')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getRoleDetails(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/roles/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveRole(role) {
    return new Promise((resolve, reject) => {
      this.http.post('/roles', {role})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  updateRole(id, role) {
    return new Promise((resolve, reject) => {
      this.http.put('/roles/' + id, {role})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteRoles(roles) {
    return new Promise((resolve, reject) => {
      this.http.post('/roles/delete', {roles})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deactivateRoles(roles) {
    return new Promise((resolve, reject) => {
      this.http.post('/roles/deactivate', roles)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  reactivateRoles(roles) {
    return new Promise((resolve, reject) => {
      this.http.post('/roles/reactivate', roles)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
