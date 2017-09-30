import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  route: string;
  routeState = true;
  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if (location.path() !== '') {
        this.route = location.path();
        if (this.route === '/login' || this.route === '/forgotpassword') {
          this.routeState = true;
        } else {
          this.routeState = false;
        }
      } else {
        this.route = 'Home';
      }
    });
  }
  ngOnInit() {}
}
