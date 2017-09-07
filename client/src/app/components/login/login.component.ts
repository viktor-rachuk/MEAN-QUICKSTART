import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {BlankComponent} from '../blank/blank.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: string;
  remember_me: boolean;
  user: any;
  public loading = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      let  home_url = '';
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.accounttype === 'super') {
        this.router.navigate(['/dashboard']);
      }
      if (user.accounttype === 'staff' || user.accounttype === 'customer') {
        if (user.role) {
          home_url = this.user.role.home_url;
        }
        if (user.special_permissions) {
          home_url = this.user.special_permissions.home_url;
        }
        this.router.navigate([home_url]);
      }
    }
    this.error = '';
    this.remember_me = false;
    this.validateRemember();
  }

  validateRemember() {
    const remember_token = JSON.parse(localStorage.getItem('remember_token'));
    if (remember_token) {
      this.username = remember_token.username;
      this.password = remember_token.password;
    }
  }

  onLoginSubmit() {
    const user = {};
    this.loading = true;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.username)) {
      user['email'] = this.username;
      user['password'] = this.password;
    } else {
      user['username'] = this.username;
      user['password'] = this.password;
    }
    // Remember Me
    if (this.remember_me) {
      localStorage.setItem('remember_token', JSON.stringify(user) );
    } else {
      localStorage.removeItem('remember_token');
    }
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.loading = false;
        this.authService.storeUserData(data.token, data.user);
        this.user = JSON.parse(localStorage.getItem('user'));
        // if user's accounttype is super admin
        if (this.user.accounttype === 'super') {
          this.router.navigate(['/dashboard']);
        }

        if ( this.user.accounttype === 'staff' || this.user.accounttype === 'customer' ) {
          if (!this.user.role) {
            if (!this.user.special_permissions) {
              this.router.navigate(['/blank']);
            } else {
              this.router.navigate([
                '/' + this.user.special_permissions.home_url,
              ]);
            }
          } else {
            if (this.user.role.status !== true) {
              this.router.navigate(['/blank']);
            } else {
                if (!this.user.role.home_url) {
                this.router.navigate(['/dashboard']);
              } else {
                this.router.navigate(['/' + this.user.role.home_url]);
              }
            }
          }
        }

        // this.router.navigate([this.user.role.home_url]);
      } else {
        this.router.navigate(['login']);
        this.loading = false;
        this.error = data.msg;
      }
    });
  }
}
