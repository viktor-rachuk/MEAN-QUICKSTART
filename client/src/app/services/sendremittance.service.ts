import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SendremittanceService {

  constructor(private http: Http) { }

  sendRemittance(content) {
  	const headers = new Headers();
    headers.append('Authorization', localStorage.getItem('id_token'));
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post('/email', content, {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
