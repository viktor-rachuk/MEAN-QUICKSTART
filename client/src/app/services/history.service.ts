import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HistoryService {
  authToken: any;
  constructor(private http: Http) { }

  getAllHistories() {
    return new Promise((resolve, reject) => {
      this.http.get('/history')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
