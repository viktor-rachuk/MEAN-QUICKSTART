import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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
  user_permission: any;
  public loading = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.goToHome();
    }
    this.error = '';
    this.remember_me = false;
    this.validateRemember();
  }

  goToHome() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    if (this.user.role) {
      this.user_permission = this.user.role;
    }
    if (this.user.special_permissions) {
      this.user_permission = this.user.special_permissions;
    }
    if (this.user.accounttype === 'super') {
      this.router.navigate(['/dashboard']);
    } else {
      if (this.user_permission.display_dashboard) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate([this.user_permission.home_url]);
      }
    }

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
        this.goToHome();
      } else {
        this.router.navigate(['login']);
        this.loading = false;
        this.error = data.msg;
      }
    });
  }
}
