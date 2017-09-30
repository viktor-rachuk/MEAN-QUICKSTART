import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
@Injectable()
export class UsersService {
  authToken: any; // JWT Auth Token
  constructor(private http: Http) { }
// Get User Details With ID
  getUserDetails(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/users/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
// Create New User
  createNewUser(newUser) {
    const headers = new Headers();
    this.authToken = localStorage.getItem('id_token');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
    this.http.post('/users/register', newUser , {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
// Update User Profile
  updateUser(id, data) {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem('id_token'));
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
        this.http.put('/users/' + id, data, {headers: headers})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
// Inactiave Users With Their IDS
  inActivateUser(users) {
    const headers = new Headers();
    this.authToken = localStorage.getItem('id_token');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/inactivate', users , {headers: headers})
      .map(res => res.json());
}
// Deactivate Users With Their IDS
  deActivateUsers(users) {
    const headers = new Headers();
    this.authToken = localStorage.getItem('id_token');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/activate', users , {headers: headers})
      .map(res => res.json());
  }
// Delete Multiple Uses With Their IDS
  deleteUsers(users) {
    const headers = new Headers();
    this.authToken = localStorage.getItem('id_token');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/delete', users , {headers: headers})
      .map(res => res.json());
  }
// Get All Users
  getAllUsers() {
    const headers = new Headers();
    this.authToken = localStorage.getItem('id_token');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
    this.http.get('/users', {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
// Get All Staff users
  getAllStaffs() {
    const headers = new Headers();
    this.authToken = localStorage.getItem('id_token');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
    this.http.post('/users/staffs', {headers: headers})
      .map(res => res.json())
      .retry(3)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

// Get Child Customers of customer user screen when customer logged in
  getAllCustomers(companies) {
    const headers = new Headers();
    this.authToken = localStorage.getItem('id_token');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
    this.http.post('/users/customers', companies, {headers: headers})
      .map(res => res.json())
      .retry(3)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  // Get All Staff Uses of Customer User With Store Ids assigned to company assigned to customer user
  getStaffOfCustomer(stores) {
    const headers = new Headers();
    this.authToken = localStorage.getItem('id_token');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
    this.http.post('/users/customer_staffs', stores, {headers: headers})
      .map(res => res.json())
      .retry(3)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  // Send User email in forgot password screen
  sendCode(email) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
    this.http.post('/users/sen_code', {email}, {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  // Confirm User Code
  confirmCode(code) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
    this.http.post('/users/con_code', code, {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  // Reset password
  resetPassword(password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
    this.http.post('/users/res_password', password, {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  // check email already exist
  checkEmail(email) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
    this.http.post('/users/val_email', {email}, {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

}


