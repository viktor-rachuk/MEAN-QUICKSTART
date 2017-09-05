import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  logoUrl: any;
  photoUrl: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));

    if (!this.currentUser.logo) {
      this.logoUrl = 'assets/images/logo.png';
    } else {
      this.logoUrl = 'uploads/logo/' + this.currentUser.logo;
    }

    if (!this.currentUser.photo) {
      this.photoUrl = 'assets/images/photo.jpg';
    } else {
      this.photoUrl = 'uploads/logo/' + this.currentUser.photo;
    }
    // Minimalize menu
    $('.navbar-minimalize').on('click', function() {
      if ($(window).width() > 991) {
        $('body').toggleClass('mini-navbar');
      } else {
        $('body').toggleClass('mini-navbar');
      }
    });

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    // $.material.init();

    $(function() {
      $('.scroller').slimScroll({
        height: '250px',
      });
      $('#menu').metisMenu();
    });
  }

  logout() {
    this.authService.logout();
  }
}
